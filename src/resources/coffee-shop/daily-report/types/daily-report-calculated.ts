import { type DailyReport } from "../daily-report-schema";

export type DailyReportCalculated = Pick<
    DailyReport,
    | "employeeTotalSalary"
    | "totalRevenue"
    | "acquiringFee"
    | "netProfit"
    | "salaryPercent"
    | "costPercent"
    | "writeOffPercent"
    | "cashPercent"
    | "terminalPercent"
>;
