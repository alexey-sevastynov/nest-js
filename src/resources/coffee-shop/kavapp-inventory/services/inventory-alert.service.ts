import { Injectable } from "@nestjs/common";
import { format as formatDateFns } from "date-fns";
import { getRequiredEnv } from "../../../../common/utils/infra/env-functions";
import { envKeys } from "../../../../common/enums/infra/env-key";
import { TelegramService } from "../../../../infra/telegram/telegram.service";
import { KavappInventoryItem } from "../../../../integrations/kavapp/types/inventory/kavapp-inventory-item";
import { KavappInventoryResponse } from "../../../../integrations/kavapp/types/inventory/kavapp-inventory-response";
import { KavappInventory } from "../kavapp-inventory-schema";
import { InventoryAlertRuleDocument } from "../inventory-alert-rule-schema";
import { InventoryAlertRuleService } from "./inventory-alert-rule.service";
import { inventoryAlertIgnoreNames } from "../constants/inventory-alert-rules";

type AlertState = "NONE" | "LOW_STOCK" | "NEGATIVE";
type Alert = { item: KavappInventoryItem; rule?: InventoryAlertRuleDocument };

@Injectable()
export class InventoryAlertService {
    constructor(
        private readonly telegramService: TelegramService,
        private readonly ruleService: InventoryAlertRuleService,
    ) {}

    async checkAndNotify(
        inventory: KavappInventoryResponse,
        previousSnapshot: KavappInventory | null,
        forceTest = false,
    ): Promise<void> {
        const rules = await this.ruleService.getRules();
        const rulesByKey = new Map(
            rules.map((rule) => [this.ruleKey(rule.itemType, rule.kavappItemId), rule]),
        );
        const rulesByName = new Map(rules.map((rule) => [this.normalizeName(rule.name), rule]));
        const currentItems = this.getAllItems(inventory);
        const previousItems = previousSnapshot ? this.getAllItems(previousSnapshot) : [];
        const previousStates = new Map<string, AlertState>();

        for (const item of previousItems) {
            const rule = this.findRule(item, rulesByKey, rulesByName);
            if (!rule) continue;

            const ruleChangedAt = Math.max(
                rule.createdAt?.getTime?.() ?? 0,
                rule.updatedAt?.getTime?.() ?? 0,
            );
            const previousSyncDate = previousSnapshot?.syncDate?.getTime?.() ?? 0;

            if (ruleChangedAt > previousSyncDate) continue;

            previousStates.set(this.itemKey(item), this.getState(this.toQuantity(item.itemcount), rule));
        }

        const negativeAlerts: Alert[] = [];
        const lowStockAlerts: Alert[] = [];
        let hasNewAlert = forceTest;

        for (const item of currentItems) {
            const rule = this.findRule(item, rulesByKey, rulesByName);
            const currentState = this.getState(this.toQuantity(item.itemcount), rule);

            if (currentState === "NEGATIVE" && !inventoryAlertIgnoreNames.has(item.name)) {
                negativeAlerts.push({ item, rule });
                hasNewAlert = true;
            }

            if (!rule) continue;
            const previousState = previousStates.get(this.itemKey(item)) ?? "NONE";
            if (currentState === "LOW_STOCK") lowStockAlerts.push({ item, rule });
            if (
                !forceTest &&
                ((previousState === "NONE" && currentState !== "NONE") ||
                    (previousState === "LOW_STOCK" && currentState === "NEGATIVE"))
            )
                hasNewAlert = true;
        }

        if (!forceTest && !hasNewAlert) return;
        const message =
            negativeAlerts.length || lowStockAlerts.length
                ? this.formatAlertMessage(negativeAlerts, lowStockAlerts, forceTest)
                : this.formatEmptyMessage(forceTest);
        await this.telegramService.sendMessage(getRequiredEnv(envKeys.telegramChatId), message);
    }

    private getAllItems(inventory: KavappInventoryResponse | KavappInventory): KavappInventoryItem[] {
        return [
            ...(inventory.cup ?? []).map((item) => ({ ...item, type: "cup" })),
            ...(inventory.ingredient ?? []).map((item) => ({ ...item, type: "ingredient" })),
            ...(inventory.product ?? []).map((item) => ({ ...item, type: "product" })),
            ...(inventory.kitchen ?? []).map((item) => ({ ...item, type: "kitchen" })),
        ];
    }

    private findRule(
        item: KavappInventoryItem,
        byKey: Map<string, InventoryAlertRuleDocument>,
        byName: Map<string, InventoryAlertRuleDocument>,
    ): InventoryAlertRuleDocument | undefined {
        const type = item.type as InventoryAlertRuleDocument["itemType"];
        const ids = [item.itemid, item.id].filter((id): id is string => Boolean(id));

        for (const id of ids) {
            const rule = byKey.get(this.ruleKey(type, id));

            if (rule) return rule;
        }

        return byName.get(this.normalizeName(item.name));
    }

    private normalizeName(value: unknown): string {
        return this.toText(value).normalize("NFKC").replace(/\s+/g, " ").trim().toLocaleLowerCase("uk-UA");
    }

    private toQuantity(value: unknown): number {
        if (typeof value === "number") return value;

        const quantity = Number(this.toText(value).trim().replace(/[−–—]/g, "-").replace(",", "."));

        return Number.isFinite(quantity) ? quantity : 0;
    }

    private toText(value: unknown): string {
        return typeof value === "string" || typeof value === "number" ? String(value) : "";
    }

    private getState(quantity: number, rule?: InventoryAlertRuleDocument): AlertState {
        if (quantity < 0) return "NEGATIVE";
        return rule && quantity <= rule.threshold ? "LOW_STOCK" : "NONE";
    }

    private itemKey(item: KavappInventoryItem): string {
        return `${item.type}:${item.itemid ?? item.id ?? item.name}`;
    }
    private ruleKey(type: string, id: string): string {
        return `${type}:${id}`;
    }

    private getItemUnit(item: KavappInventoryItem, rule?: InventoryAlertRuleDocument): string {
        return (
            item.unitsName ??
            (item.units === "1" ? "шт." : item.units === "2" ? "г" : item.units || rule?.unit || "")
        );
    }

    private formatAlertMessage(negative: Alert[], lowStock: Alert[], test: boolean): string {
        let message = `📦 *Контроль залишків${test ? " (ТЕСТ)" : ""}*\n${formatDateFns(new Date(), "dd.MM.yyyy HH:mm")}\n`;
        if (negative.length) {
            message += "\n🚨 *Від’ємні залишки*\n\n";
            for (const { item, rule } of negative)
                message += `• ${item.name} — ${this.formatNumberUa(item.itemcount)} ${this.getItemUnit(item, rule)}\n`;
        }
        if (lowStock.length) {
            message += "\n⚠️ *Потрібно поповнити*\n\n";
            for (const { item, rule } of lowStock) {
                message += `• ${item.name} — ${this.formatNumberUa(item.itemcount)} ${this.getItemUnit(item, rule)}\n`;
                if (rule?.description) message += `  ${rule.description}\n`;
            }
        }
        return message.trim();
    }

    private formatEmptyMessage(test: boolean): string {
        return `📦 *Контроль залишків${test ? " (ТЕСТ)" : ""}*\n${formatDateFns(new Date(), "dd.MM.yyyy HH:mm")}\n\n✅ Усі залишки в нормі.`;
    }

    private formatNumberUa(value: number): string {
        return value.toLocaleString("uk-UA", { maximumFractionDigits: 3 }).replace(/\u00A0/g, " ");
    }
}
