import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { KavappInventory, KavappInventorySchema } from "./kavapp-inventory-schema";
import { KavappInventoryService } from "./services/kavapp-inventory.service";
import { KavappSyncService } from "./services/kavapp-sync.service";
import { InventoryAlertService } from "./services/inventory-alert.service";
import { KavappInventoryController } from "./controllers/kavapp-inventory.controller";
import { KavappModule } from "../../../integrations/kavapp/kavapp.module";
import { TelegramModule } from "../../../infra/telegram/telegram.module";
import { InventoryAlertRule, InventoryAlertRuleSchema } from "./inventory-alert-rule-schema";
import { InventoryAlertRuleService } from "./services/inventory-alert-rule.service";
import { InventoryAlertRuleController } from "./controllers/inventory-alert-rule.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: KavappInventory.name, schema: KavappInventorySchema }]),
        MongooseModule.forFeature([{ name: InventoryAlertRule.name, schema: InventoryAlertRuleSchema }]),
        KavappModule,
        TelegramModule,
    ],
    controllers: [KavappInventoryController, InventoryAlertRuleController],
    providers: [KavappInventoryService, KavappSyncService, InventoryAlertService, InventoryAlertRuleService],
    exports: [KavappInventoryService, KavappSyncService, InventoryAlertService, InventoryAlertRuleService],
})
export class KavappInventoryModule {}
