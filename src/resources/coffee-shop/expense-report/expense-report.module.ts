import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ExpenseReportService } from "./expense-report.service";
import { ExpenseReportController } from "./expense-report.controller";
import { ExpenseReport, ExpenseReportSchema } from "./expense-report-schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: ExpenseReport.name, schema: ExpenseReportSchema }])],
    controllers: [ExpenseReportController],
    providers: [ExpenseReportService],
    exports: [ExpenseReportService],
})
export class ExpenseReportModule {}
