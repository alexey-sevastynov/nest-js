import { Injectable } from "@nestjs/common";
import { KavappClient } from "../../../../integrations/kavapp/clients/kavapp.client";
import { KavappInventoryMapper } from "../../../../integrations/kavapp/mappers/kavapp-inventory.mapper";
import { KavappInventoryResponse } from "../../../../integrations/kavapp/types/inventory/kavapp-inventory-response";

@Injectable()
export class KavappInventoryService {
    constructor(private readonly kavappClient: KavappClient) {}

    async getCurrentInventory(pointId?: string): Promise<KavappInventoryResponse> {
        const response = await this.kavappClient.getInventory(pointId);

        return KavappInventoryMapper.map(response);
    }
}
