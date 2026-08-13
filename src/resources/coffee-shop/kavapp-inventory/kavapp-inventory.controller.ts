import { Controller, Get, Post, Query, ParseIntPipe, DefaultValuePipe } from "@nestjs/common";
import { Roles } from "../../../common/auth/decorators/roles.decorator";
import { authorizedRoles } from "../../../common/auth/constants/authorized-roles";
import { KavappInventoryResponse } from "../../../integrations/kavapp/types/inventory/kavapp-inventory-response";
import { KavappInventoryService } from "./services/kavapp-inventory.service";
import { KavappSyncService } from "./services/kavapp-sync.service";

@Roles(...authorizedRoles.coffeeShop)
@Controller("kavapp")
export class KavappInventoryController {
    constructor(
        private readonly kavappInventoryService: KavappInventoryService,
        private readonly kavappSyncService: KavappSyncService,
    ) {}

    @Get("inventory")
    async getInventory(@Query("pointId") pointId?: string): Promise<KavappInventoryResponse> {
        return this.kavappInventoryService.getCurrentInventory(pointId);
    }

    @Post("sync")
    async sync(@Query("pointId") pointId?: string, @Query("testAlert") testAlert?: string) {
        const isTest = testAlert === "true";

        return this.kavappSyncService.sync(pointId, isTest);
    }

    @Get("snapshots/latest")
    async getLatestSnapshot() {
        return this.kavappSyncService.getLatestSnapshot();
    }

    @Get("snapshots")
    async getSnapshots(@Query("limit", new DefaultValuePipe(30), ParseIntPipe) limit: number) {
        return this.kavappSyncService.getHistory(limit);
    }
}
