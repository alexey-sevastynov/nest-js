export interface KavappInventoryItem {
    article: string;
    manufacturer: string;
    name: string;
    type: string;
    itemcount: number;
    units: string;
    itemPrice: number;
    itemsCost: number;
    id?: string;
    itemid?: string;
    unitsName?: string;
    orderid?: string;
    salePrice?: number;
    saleCost?: number;
}

export type KavappInventoryItemType = "ingredient" | "cup" | "product" | "kitchen";

export interface KavappCatalogItem {
    id: string;
    name: string;
    units?: string;
    unitsName?: string;
    volumeUnits?: string;
    volumeUnitsName?: string;
    type: Exclude<KavappInventoryItemType, "kitchen">;
}
