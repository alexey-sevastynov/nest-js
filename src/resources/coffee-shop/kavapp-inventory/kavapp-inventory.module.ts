import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { KavappInventory, KavappInventorySchema } from "./kavapp-inventory-schema";
import { KavappInventoryService } from "./services/kavapp-inventory.service";
import { KavappSyncService } from "./services/kavapp-sync.service";
import { InventoryAlertService } from "./services/inventory-alert.service";
import { KavappInventoryController } from "./kavapp-inventory.controller";
import { KavappModule } from "../../../integrations/kavapp/kavapp.module";
import { TelegramModule } from "../../../infra/telegram/telegram.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: KavappInventory.name, schema: KavappInventorySchema }]),
        KavappModule,
        TelegramModule,
    ],
    controllers: [KavappInventoryController],
    providers: [KavappInventoryService, KavappSyncService, InventoryAlertService],
    exports: [KavappInventoryService, KavappSyncService, InventoryAlertService],
})
export class KavappInventoryModule {}
