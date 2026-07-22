import { type DateRange } from "../../../../common/types/date-range/date-range-type";
import { type EmployeeStats } from "./employee-stats";
import { type ExpensesBreakdown } from "./expenses-breakdown";
import { type InventoryAuditTotals } from "./inventory-audit-totals";
import { type StatisticsPercentages } from "./statistics-percentages";
import { type OwnerWithdrawalSummary } from "./owner-withdrawal-summary";

export interface CoffeeShopStatistics {
    period: DateRange;
    totalDays: number;
    totalShifts: number;
    totalRevenue: number;
    cashRevenue: number;
    terminalRevenue: number;
    costOfGoods: number;
    productWriteOffs: number;
    acquiringFee: number;
    totalExpenses: number;
    inventoryAuditTotals: InventoryAuditTotals;
    expensesBreakdown: ExpensesBreakdown;
    netProfit: number;
    netProfitAfterExpenses: number;
    percentages: StatisticsPercentages;
    employees: EmployeeStats[];
    ownerWithdrawals: OwnerWithdrawalSummary;
}
