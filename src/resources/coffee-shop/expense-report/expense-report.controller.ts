import { Controller, Get, Post, Delete, Body, Param, Patch, UsePipes, ValidationPipe } from "@nestjs/common";
import { TelegramNotify } from "../../../infra/telegram/telegram.decorator";
import { telegramActions } from "../../../infra/telegram/constants";
import { ExpenseReportService } from "./expense-report.service";
import { CreateExpenseReportDto } from "./dto/create-expense-report-dto";
import { UpdateExpenseReportDto } from "./dto/update-expense-report-dto";
import { formatExpenseReportMessage } from "./expense-report-telegram";

@Controller("coffee-shop/expense-reports")
export class ExpenseReportController {
    constructor(private readonly service: ExpenseReportService) {}

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
    @TelegramNotify({
        resource: "ExpenseReport",
        action: telegramActions.create,
        message: formatExpenseReportMessage(),
    })
    create(@Body() dto: CreateExpenseReportDto) {
        return this.service.create(dto);
    }

    @Patch(":id")
    @UsePipes(new ValidationPipe())
    @TelegramNotify({
        resource: "ExpenseReport",
        action: telegramActions.update,
        message: formatExpenseReportMessage(),
    })
    update(@Param("id") id: string, @Body() dto: UpdateExpenseReportDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    @TelegramNotify({ resource: "ExpenseReport", action: telegramActions.delete })
    delete(@Param("id") id: string) {
        return this.service.delete(id);
    }

    @Delete()
    deleteAll() {
        return this.service.deleteAll();
    }
}
