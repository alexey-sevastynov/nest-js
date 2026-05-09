import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { InventoryAuditService } from "./inventory-audit.service";
import { InventoryAuditController } from "./inventory-audit.controller";
import { InventoryAudit, InventoryAuditSchema } from "./inventory-audit-schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: InventoryAudit.name, schema: InventoryAuditSchema }])],
    controllers: [InventoryAuditController],
    providers: [InventoryAuditService],
    exports: [InventoryAuditService],
})
export class InventoryAuditModule {}
