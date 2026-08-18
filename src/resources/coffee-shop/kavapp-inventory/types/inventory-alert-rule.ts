import type { KavappInventoryItemType } from "../../../../integrations/kavapp/types/inventory/kavapp-inventory-item";

export type { KavappInventoryItemType };

export interface InventoryAlertRuleData {
    itemType: KavappInventoryItemType;
    kavappItemId: string;
    name: string;
    unit: string;
    threshold: number;
    description?: string;
}
