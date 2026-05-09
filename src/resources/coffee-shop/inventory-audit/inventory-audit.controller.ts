import { Controller, Get, Post, Delete, Body, Param, Patch, UsePipes, ValidationPipe } from "@nestjs/common";
import { InventoryAuditService } from "./inventory-audit.service";
import { CreateInventoryAuditDto } from "./dto/create-inventory-audit-dto";
import { UpdateInventoryAuditDto } from "./dto/update-inventory-audit-dto";

@Controller("coffee-shop/inventory-audits")
export class InventoryAuditController {
    constructor(private readonly service: InventoryAuditService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.service.findById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    create(@Body() dto: CreateInventoryAuditDto) {
        return this.service.create(dto);
    }

    @Patch(":id")
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    update(@Param("id") id: string, @Body() dto: UpdateInventoryAuditDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.service.delete(id);
    }

    @Delete()
    deleteAll() {
        return this.service.deleteAll();
    }
}
