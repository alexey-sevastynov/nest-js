import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe } from "@nestjs/common";
import { DailyReportService } from "./daily-report.service";
import { CreateDailyReportDto } from "./dto/create-daily-report-dto";
import { UpdateDailyReportDto } from "./dto/update-daily-report-dto";

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
    create(@Body() dto: CreateDailyReportDto) {
        return this.service.createDailyReport(dto);
    }

    @Put(":id")
    @UsePipes(new ValidationPipe())
    update(@Param("id") id: string, @Body() dto: UpdateDailyReportDto) {
        return this.service.updateDailyReport(id, dto);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.service.deleteDailyReport(id);
    }

    @Delete()
    deleteAll() {
        return this.service.deleteAllDailyReports();
    }
}
