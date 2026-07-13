import { Controller, Get, Post, Delete, Body, Param, Patch, UsePipes, ValidationPipe } from "@nestjs/common";
import { FacilityExpenseService } from "./facility-expense.service";
import { CreateFacilityExpenseDto } from "./dto/create-facility-expense-dto";
import { UpdateFacilityExpenseDto } from "./dto/update-facility-expense-dto";

@Controller("coffee-shop/facility-expenses")
export class FacilityExpenseController {
    constructor(private readonly service: FacilityExpenseService) {}

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
    create(@Body() dto: CreateFacilityExpenseDto) {
        return this.service.create(dto);
    }

    @Patch(":id")
    @UsePipes(new ValidationPipe())
    update(@Param("id") id: string, @Body() dto: UpdateFacilityExpenseDto) {
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
