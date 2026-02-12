import { type CreateDailyReportDto } from "../dto/create-daily-report-dto";

export type DailyReportInput = Pick<
    CreateDailyReportDto,
    "cashRevenue" | "terminalRevenue" | "costOfGoods" | "productWriteOffs" | "employeeBonus"
>;
