import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { startOfDayNormalized, endOfDayNormalized } from "../../../common/lib/date";
import { percent, round } from "../../../common/lib/math";
import { DailyReport, DailyReportDocument } from "../daily-report/daily-report-schema";
import { expenseReportTypes } from "../expense-report/enums/expense-report-type";
import { ExpenseReport, ExpenseReportDocument } from "../expense-report/expense-report-schema";
import { GetStatisticsDto } from "./dto/get-statistics.dto";
import { EmployeeStats } from "./types/employee-stats";
import { CoffeeShopStatistics } from "./types/statistic-coffee-shop";
import { StatisticsPercentages } from "./types/statistics-percentages";
import { ExpensesBreakdown } from "./types/expenses-breakdown";

@Injectable()
export class StatisticsService {
    constructor(
        @InjectModel(DailyReport.name)
        private readonly dailyReportModel: Model<DailyReportDocument>,
        @InjectModel(ExpenseReport.name)
        private readonly expenseReportModel: Model<ExpenseReportDocument>,
    ) {}

    async getStatistics(dateRange: GetStatisticsDto) {
        const startOfDay = startOfDayNormalized(dateRange.from);
        const endOfDay = endOfDayNormalized(dateRange.to);
        const dailyReports = await this.getDailyReports(startOfDay, endOfDay);
        const dailyExpenses = await this.getDailyExpenses(startOfDay, endOfDay);
        const monthlyExpenses = await this.getMonthlyExpenses(startOfDay, endOfDay);
        const coffeeShopStatistics = this.createCoffeeShopStatistics(
            startOfDay,
            endOfDay,
            dailyReports,
            dailyExpenses,
            monthlyExpenses,
        );

        return coffeeShopStatistics;
    }

    private async getDailyReports(startOfDay: Date, endOfDay: Date) {
        const dailyReports = await this.dailyReportModel
            .find({ date: { $gte: startOfDay, $lte: endOfDay } })
            .populate("employee");

        return dailyReports;
    }

    private async getDailyExpenses(startOfDay: Date, endOfDay: Date) {
        const dailyExpenses = await this.expenseReportModel.find({
            type: expenseReportTypes.daily,
            date: { $gte: startOfDay, $lte: endOfDay },
        });

        return dailyExpenses;
    }

    private async getMonthlyExpenses(startOfDay: Date, endOfDay: Date) {
        const monthlyExpenses = await this.expenseReportModel.find({
            type: expenseReportTypes.monthly,
            validFrom: { $lte: endOfDay },
            $or: [{ validTo: { $exists: false } }, { validTo: null }, { validTo: { $gte: startOfDay } }],
        });

        return monthlyExpenses;
    }

    private createStatisticsPercentages(
        totalRevenue: number,
        totalEmployeesSalary: number,
        costOfGoods: number,
        productWriteOffs: number,
        cashRevenue: number,
        terminalRevenue: number,
        acquiringFee: number,
    ) {
        const statisticsPercentages: StatisticsPercentages = {
            salaryPercent: percent(totalEmployeesSalary, totalRevenue),
            costPercent: percent(costOfGoods, totalRevenue),
            writeOffPercent: percent(productWriteOffs, totalRevenue),
            cashPercent: percent(cashRevenue, totalRevenue),
            terminalPercent: percent(terminalRevenue, totalRevenue),
            acquiringPercent: percent(acquiringFee, totalRevenue),
        };

        return statisticsPercentages;
    }

    private createExpensesBreakdown(totalDailyExpensesAmount: number, totalMonthlyExpensesAmount: number) {
        const expensesBreakdown: ExpensesBreakdown = {
            dailyExpenses: round(totalDailyExpensesAmount),
            monthlyExpensesApportioned: round(totalMonthlyExpensesAmount),
        };

        return expensesBreakdown;
    }

    private aggregateDailyReports(dailyReports: DailyReport[]) {
        let totalRevenue = 0;
        let cashRevenue = 0;
        let terminalRevenue = 0;
        let costOfGoods = 0;
        let productWriteOffs = 0;
        let acquiringFee = 0;
        let netProfit = 0;

        const employeeStats: Record<string, EmployeeStats> = {};

        for (const report of dailyReports) {
            totalRevenue += report.totalRevenue ?? 0;
            cashRevenue += report.cashRevenue ?? 0;
            terminalRevenue += report.terminalRevenue ?? 0;
            costOfGoods += report.costOfGoods ?? 0;
            productWriteOffs += report.productWriteOffs ?? 0;
            acquiringFee += report.acquiringFee ?? 0;
            netProfit += report.netProfit ?? 0;

            const employee = report.employee;
            const employeeId = employee._id.toString();

            if (!employeeStats[employeeId]) {
                employeeStats[employeeId] = {
                    name: employee.name,
                    shifts: 0,
                    basicSalary: 0,
                    bonuses: 0,
                    totalSalary: 0,
                };
            }

            employeeStats[employeeId].shifts += 1;
            employeeStats[employeeId].bonuses += report.employeeBonus || 0;
            employeeStats[employeeId].totalSalary += report.employeeTotalSalary || 0;
            employeeStats[employeeId].basicSalary +=
                (report.employeeTotalSalary || 0) - (report.employeeBonus || 0);
        }

        return {
            totalRevenue,
            cashRevenue,
            terminalRevenue,
            costOfGoods,
            productWriteOffs,
            acquiringFee,
            netProfit,
            employeeStats,
        };
    }

    private calculateMonthlyExpensesApportioned(
        startOfDay: Date,
        endOfDay: Date,
        monthlyExpenses: ExpenseReport[],
    ) {
        const dayMs = 24 * 60 * 60 * 1000;
        const startTs = startOfDay.getTime();
        const endTs = endOfDay.getTime();
        let totalMonthlyExpensesAmount = 0;

        for (let ts = startTs; ts <= endTs; ts += dayMs) {
            const d = new Date(ts);
            const year = d.getFullYear();
            const month = d.getMonth();
            const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

            for (const expense of monthlyExpenses) {
                const activeFrom = new Date(expense.validFrom as Date);
                activeFrom.setHours(0, 0, 0, 0);

                let activeTo: Date | null = null;
                if (expense.validTo) {
                    activeTo = new Date(expense.validTo);
                    activeTo.setHours(23, 59, 59, 999);
                }

                const tsDate = d.getTime();
                if (tsDate >= activeFrom.getTime() && (!activeTo || tsDate <= activeTo.getTime())) {
                    totalMonthlyExpensesAmount += expense.amount / daysInCurrentMonth;
                }
            }
        }

        return totalMonthlyExpensesAmount;
    }

    private createCoffeeShopStatistics(
        startOfDay: Date,
        endOfDay: Date,
        dailyReports: DailyReport[],
        dailyExpenses: ExpenseReport[],
        monthlyExpenses: ExpenseReport[],
    ) {
        const aggregatedDaily = this.aggregateDailyReports(dailyReports);
        let totalDailyExpensesAmount = 0;

        for (const expense of dailyExpenses) {
            totalDailyExpensesAmount += expense.amount;
        }

        const totalMonthlyExpensesAmount = this.calculateMonthlyExpensesApportioned(
            startOfDay,
            endOfDay,
            monthlyExpenses,
        );

        const totalExpensesAmount = totalDailyExpensesAmount + totalMonthlyExpensesAmount;

        const dayMs = 24 * 60 * 60 * 1000;
        const timeDiff = endOfDay.getTime() - startOfDay.getTime() + 1;
        const totalDays = Math.ceil(timeDiff / dayMs);

        const totalShifts = Object.values(aggregatedDaily.employeeStats).reduce(
            (sum, emp) => sum + emp.shifts,
            0,
        );
        const totalEmployeesSalary = Object.values(aggregatedDaily.employeeStats).reduce(
            (sum, emp) => sum + emp.totalSalary,
            0,
        );

        const coffeeShopStatistics: CoffeeShopStatistics = {
            period: { from: startOfDay, to: endOfDay },
            totalDays,
            totalShifts,
            totalRevenue: round(aggregatedDaily.totalRevenue),
            cashRevenue: round(aggregatedDaily.cashRevenue),
            terminalRevenue: round(aggregatedDaily.terminalRevenue),
            costOfGoods: round(aggregatedDaily.costOfGoods),
            productWriteOffs: round(aggregatedDaily.productWriteOffs),
            acquiringFee: round(aggregatedDaily.acquiringFee),
            totalExpenses: round(totalExpensesAmount),
            breakdown: this.createExpensesBreakdown(totalDailyExpensesAmount, totalMonthlyExpensesAmount),
            netProfit: round(aggregatedDaily.netProfit),
            netProfitAfterExpenses: round(aggregatedDaily.netProfit - totalExpensesAmount),
            percentages: this.createStatisticsPercentages(
                aggregatedDaily.totalRevenue,
                totalEmployeesSalary,
                aggregatedDaily.costOfGoods,
                aggregatedDaily.productWriteOffs,
                aggregatedDaily.cashRevenue,
                aggregatedDaily.terminalRevenue,
                aggregatedDaily.acquiringFee,
            ),
            employees: Object.values(aggregatedDaily.employeeStats),
        };

        return coffeeShopStatistics;
    }
}
