export const expenseReportTypes = {
    daily: "daily",
    monthly: "monthly",
} as const;

export type ExpenseReportType = (typeof expenseReportTypes)[keyof typeof expenseReportTypes];
