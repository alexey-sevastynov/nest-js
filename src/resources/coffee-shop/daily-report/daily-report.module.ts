import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DailyReportService } from "./daily-report.service";
import { DailyReportController } from "./daily-report.controller";
import { Employee, EmployeeSchema } from "../employee/employee-schema";
import { DailyReport, DailyReportSchema } from "./daily-report-schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DailyReport.name, schema: DailyReportSchema },
            { name: Employee.name, schema: EmployeeSchema },
        ]),
    ],
    controllers: [DailyReportController],
    providers: [DailyReportService],
    exports: [DailyReportService],
})
export class DailyReportModule {}
