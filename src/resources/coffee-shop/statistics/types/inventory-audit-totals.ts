import { type InventoryAuditBreakdownItem } from "./inventory-audit-breakdown-item";

export interface InventoryAuditTotals {
    shortage: InventoryAuditGroup;
    surplus: InventoryAuditGroup;
    inventoryAuditAdjustmentAmount: number;
}

export interface InventoryAuditGroup {
    totalAmount: number;
    items: InventoryAuditBreakdownItem[];
}
