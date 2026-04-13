import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DailyReport, DailyReportSchema } from "../daily-report/daily-report-schema";
import { ExpenseReport, ExpenseReportSchema } from "../expense-report/expense-report-schema";
import { StatisticsService } from "./statistics.service";
import { StatisticsController } from "./statistics.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DailyReport.name, schema: DailyReportSchema },
            { name: ExpenseReport.name, schema: ExpenseReportSchema },
        ]),
    ],
    controllers: [StatisticsController],
    providers: [StatisticsService],
})
export class StatisticsModule {}
