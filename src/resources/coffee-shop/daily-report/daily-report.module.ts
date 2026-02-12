import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DailyReportService } from "./daily-report.service";
import { DailyReportController } from "./daily-report.controller";
import { Employer, EmployerSchema } from "../employer/employer-schema";
import { DailyReport, DailyReportSchema } from "./daily-report-schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DailyReport.name, schema: DailyReportSchema },
            { name: Employer.name, schema: EmployerSchema },
        ]),
    ],
    controllers: [DailyReportController],
    providers: [DailyReportService],
    exports: [DailyReportService],
})
export class DailyReportModule {}
