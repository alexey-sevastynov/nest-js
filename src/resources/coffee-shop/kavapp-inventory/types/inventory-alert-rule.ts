export interface InventoryAlertRule {
    name: string;
    threshold: number;
    unit: string;
    message?: string;
}
