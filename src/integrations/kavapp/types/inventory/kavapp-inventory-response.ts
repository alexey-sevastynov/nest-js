import type { KavappCatalogItem, KavappInventoryItem } from "./kavapp-inventory-item";

export interface KavappInventoryResponse {
    cup: KavappInventoryItem[];
    ingredient: KavappInventoryItem[];
    product: KavappInventoryItem[];
    kitchen: KavappInventoryItem[];
}

export type KavappCatalogResponse = KavappCatalogItem[];
