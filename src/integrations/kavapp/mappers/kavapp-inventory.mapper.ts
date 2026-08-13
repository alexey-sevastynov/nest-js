import type { KavappInventoryResponse } from "../types/inventory/kavapp-inventory-response";

export class KavappInventoryMapper {
    static mapItem<T>(item: T): T {
        return item;
    }

    static map(response: KavappInventoryResponse): KavappInventoryResponse {
        return {
            cup: (response.cup || []).map((item) => this.mapItem(item)),
            ingredient: (response.ingredient || []).map((item) => this.mapItem(item)),
            product: (response.product || []).map((item) => this.mapItem(item)),
            kitchen: (response.kitchen || []).map((item) => this.mapItem(item)),
        };
    }
}
