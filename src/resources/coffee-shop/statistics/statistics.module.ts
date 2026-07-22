import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DailyReport, DailyReportSchema } from "../daily-report/daily-report-schema";
import { ExpenseReport, ExpenseReportSchema } from "../expense-report/expense-report-schema";
import { InventoryAudit, InventoryAuditSchema } from "../inventory-audit/inventory-audit-schema";
import { OwnerWithdrawal, OwnerWithdrawalSchema } from "../owner-withdrawal/owner-withdrawal-schema";
import { StatisticsService } from "./statistics.service";
import { StatisticsController } from "./statistics.controller";
import { ExchangeRateService } from "./services/exchange-rate.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DailyReport.name, schema: DailyReportSchema },
            { name: ExpenseReport.name, schema: ExpenseReportSchema },
            { name: InventoryAudit.name, schema: InventoryAuditSchema },
            { name: OwnerWithdrawal.name, schema: OwnerWithdrawalSchema },
        ]),
    ],
    controllers: [StatisticsController],
    providers: [StatisticsService, ExchangeRateService],
})
export class StatisticsModule {}
