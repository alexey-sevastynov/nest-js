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
