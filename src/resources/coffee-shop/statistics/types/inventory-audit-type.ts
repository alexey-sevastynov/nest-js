import { type inventoryAuditTypes } from "../constants/inventory-audit-types";

export type InventoryAuditType = (typeof inventoryAuditTypes)[keyof typeof inventoryAuditTypes];
