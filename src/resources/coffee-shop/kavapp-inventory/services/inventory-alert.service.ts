import { Injectable } from "@nestjs/common";
import { format as formatDateFns } from "date-fns";
import { getRequiredEnv } from "../../../../common/utils/infra/env-functions";
import { envKeys } from "../../../../common/enums/infra/env-key";
import { TelegramService } from "../../../../infra/telegram/telegram.service";
import { KavappInventoryItem } from "../../../../integrations/kavapp/types/inventory/kavapp-inventory-item";
import { KavappInventoryResponse } from "../../../../integrations/kavapp/types/inventory/kavapp-inventory-response";
import { KavappInventory } from "../kavapp-inventory-schema";
import { inventoryAlertIgnoreNames, inventoryAlertRules } from "../constants/inventory-aler-rules";
import { InventoryAlertRule } from "../types/inventory-alert-rule";

@Injectable()
export class InventoryAlertService {
    constructor(private readonly telegramService: TelegramService) {}

    async checkAndNotify(
        kavappInventoryResponse: KavappInventoryResponse,
        previousSnapshot: KavappInventory | null,
        forceTest = false,
    ) {
        const chatId = getRequiredEnv(envKeys.telegramChatId);

        if (forceTest) {
            const currentItems = this.getAllItems(kavappInventoryResponse);
            const negativeAlerts: KavappInventoryItem[] = [];
            const lowStockAlerts: { item: KavappInventoryItem; rule: InventoryAlertRule }[] = [];

            for (const item of currentItems) {
                const currentState = this.getItemAlertState(item.name, item.itemcount);

                if (currentState === "NEGATIVE") {
                    negativeAlerts.push(item);
                } else if (currentState === "LOW_STOCK") {
                    const rule = inventoryAlertRules.find((r) => r.name === item.name);
                    if (rule) {
                        lowStockAlerts.push({ item, rule });
                    }
                }
            }

            let messageText = "";

            if (negativeAlerts.length === 0 && lowStockAlerts.length === 0) {
                const dateStr = formatDateFns(new Date(), "dd.MM.yyyy HH:mm");
                messageText = `📦 *Контроль залишків (ТЕСТ)*\n${dateStr}\n\n✅ Усі залишки v нормі. Критичних відхилень чи низьких запасів не виявлено.`;
            } else {
                messageText = this.formatAlertMessage(negativeAlerts, lowStockAlerts);
                messageText = messageText.replace("📦 *Контроль залишків*", "📦 *Контроль залишків (ТЕСТ)*");
            }

            await this.telegramService.sendMessage(chatId, messageText);

            return;
        }

        const currentItems = this.getAllItems(kavappInventoryResponse);
        const prevItems = previousSnapshot ? this.getAllItems(previousSnapshot) : [];

        const prevStatesMap = new Map<string, "NONE" | "LOW_STOCK" | "NEGATIVE">();

        for (const item of prevItems) {
            prevStatesMap.set(item.name, this.getItemAlertState(item.name, item.itemcount));
        }

        const negativeAlerts: KavappInventoryItem[] = [];
        const lowStockAlerts: { item: KavappInventoryItem; rule: InventoryAlertRule }[] = [];
        let hasNewAlert = false;

        for (const item of currentItems) {
            const currentState = this.getItemAlertState(item.name, item.itemcount);
            const prevState = prevStatesMap.get(item.name) || "NONE";

            if (
                (prevState === "NONE" && (currentState === "LOW_STOCK" || currentState === "NEGATIVE")) ||
                (prevState === "LOW_STOCK" && currentState === "NEGATIVE")
            ) {
                hasNewAlert = true;
            }

            if (currentState === "NEGATIVE") {
                negativeAlerts.push(item);
            } else if (currentState === "LOW_STOCK") {
                const rule = inventoryAlertRules.find((r) => r.name === item.name);
                if (rule) {
                    lowStockAlerts.push({ item, rule });
                }
            }
        }

        if (!hasNewAlert) return;

        const messageText = this.formatAlertMessage(negativeAlerts, lowStockAlerts);

        await this.telegramService.sendMessage(chatId, messageText);
    }

    private getAllItems(inventory: KavappInventoryResponse): KavappInventoryItem[] {
        return [
            ...(inventory.cup || []),
            ...(inventory.ingredient || []),
            ...(inventory.product || []),
            ...(inventory.kitchen || []),
        ];
    }

    private getItemAlertState(name: string, quantity: number): "NONE" | "LOW_STOCK" | "NEGATIVE" {
        if (inventoryAlertIgnoreNames.has(name)) return "NONE";

        if (quantity < 0) return "NEGATIVE";

        const rule = inventoryAlertRules.find((r) => r.name === name);

        if (rule && quantity <= rule.threshold) return "LOW_STOCK";

        return "NONE";
    }

    private getItemUnit(item: KavappInventoryItem) {
        if (item.unitsName) return item.unitsName;

        if (item.units === "1") return "шт.";

        if (item.units === "2") return "г";

        return item.units || "";
    }

    private formatAlertMessage(
        negativeAlerts: KavappInventoryItem[],
        lowStockAlerts: { item: KavappInventoryItem; rule: InventoryAlertRule }[],
    ): string {
        const dateStr = formatDateFns(new Date(), "dd.MM.yyyy HH:mm");
        let msg = `📦 *Контроль залишків*\n${dateStr}\n`;

        if (negativeAlerts.length > 0) {
            msg += `\n🚨 *Від’ємні залишки*\n\n`;

            for (const item of negativeAlerts) {
                msg += `• ${item.name} — ${this.formatNumberUa(item.itemcount)} ${this.getItemUnit(item)}\n`;
            }
        }

        if (lowStockAlerts.length > 0) {
            msg += `\n⚠️ *Потрібно поповнити*\n\n`;

            for (const alert of lowStockAlerts) {
                const { item, rule } = alert;
                const customMsg = rule.message || "Потрібно поповнити запас.";
                msg += `• ${item.name} — ${this.formatNumberUa(item.itemcount)} ${this.getItemUnit(item)}\n  ${customMsg}\n\n`;
            }
            msg = msg.trim() + "\n";
        }

        return msg.trim();
    }

    private formatNumberUa(num: number): string {
        const isNegative = num < 0;
        const absoluteValue = Math.abs(num);

        let formatted = absoluteValue.toLocaleString("uk-UA", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3,
        });

        formatted = formatted.replace(/\u00A0/g, " ");

        return isNegative ? `−${formatted}` : formatted;
    }
}
