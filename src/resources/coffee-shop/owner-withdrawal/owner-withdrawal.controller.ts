import { Controller, Get, Post, Delete, Body, Param, Patch, UsePipes, ValidationPipe } from "@nestjs/common";
import { OwnerWithdrawalService } from "./owner-withdrawal.service";
import { CreateOwnerWithdrawalDto } from "./dto/create-owner-withdrawal-dto";
import { UpdateOwnerWithdrawalDto } from "./dto/update-owner-withdrawal-dto";

@Controller("coffee-shop/owner-withdrawals")
export class OwnerWithdrawalController {
    constructor(private readonly service: OwnerWithdrawalService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.service.findById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() dto: CreateOwnerWithdrawalDto) {
        return this.service.create(dto);
    }

    @Patch(":id")
    @UsePipes(new ValidationPipe())
    update(@Param("id") id: string, @Body() dto: UpdateOwnerWithdrawalDto) {
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
