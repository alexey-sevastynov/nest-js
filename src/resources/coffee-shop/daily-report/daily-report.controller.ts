import { Controller, Get, Post, Delete, Body, Param, UsePipes, ValidationPipe, Patch } from "@nestjs/common";
import { TelegramNotify } from "../../../infra/telegram/telegram.decorator";
import { telegramActions } from "../../../infra/telegram/constants";
import { DailyReportService } from "./daily-report.service";
import { CreateDailyReportDto } from "./dto/create-daily-report-dto";
import { UpdateDailyReportDto } from "./dto/update-daily-report-dto";
import { formatDailyReportMessage } from "./daily-report-telegram";

@Controller("coffee-shop/daily-reports")
export class DailyReportController {
    constructor(private readonly service: DailyReportService) {}

    @Get()
    findAll() {
        return this.service.findAllDailyReport();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.service.findByIdDailyReport(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @TelegramNotify({
        resource: "DailyReport",
        action: telegramActions.create,
        message: formatDailyReportMessage(),
    })
    create(@Body() dto: CreateDailyReportDto) {
        return this.service.createDailyReport(dto);
    }

    @Patch(":id")
    @UsePipes(new ValidationPipe())
    @TelegramNotify({
        resource: "DailyReport",
        action: telegramActions.update,
        message: formatDailyReportMessage(),
    })
    update(@Param("id") id: string, @Body() dto: UpdateDailyReportDto) {
        return this.service.updateDailyReport(id, dto);
    }

    @Delete(":id")
    @TelegramNotify({
        resource: "DailyReport",
        action: telegramActions.delete,
    })
    delete(@Param("id") id: string) {
        return this.service.deleteDailyReport(id);
    }

    @Delete()
    deleteAll() {
        return this.service.deleteAllDailyReports();
    }
}
