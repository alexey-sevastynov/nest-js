import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { percent, toDecimalPercent } from "../../../common/utils/math";
import { errorMessages } from "../../../common/constants/error-messages";
import { DailyReport, DailyReportDocument } from "./daily-report-schema";
import { Employee, EmployeeDocument } from "../employee/employee-schema";
import { CreateDailyReportDto } from "./dto/create-daily-report-dto";
import { UpdateDailyReportDto } from "./dto/update-daily-report-dto";
import { dailyReportProps } from "./constants/daily-report-props";
import { acquiringPercent } from "./constants/daily-report";
import { DailyReportCalculated } from "./types/daily-report-calculated";
import { DailyReportInput } from "./types/daily-report-input";

@Injectable()
export class DailyReportService {
    constructor(
        @InjectModel(DailyReport.name)
        private readonly dailyModel: Model<DailyReportDocument>,
        @InjectModel(Employee.name)
        private readonly employeeModel: Model<EmployeeDocument>,
    ) {}

    findAllDailyReport() {
        return this.dailyModel.find().sort({ date: -1 }).populate(dailyReportProps.employee);
    }

    async findByIdDailyReport(id: string) {
        const report = await this.dailyModel.findById(id).populate(dailyReportProps.employee);

        if (!report) throw new NotFoundException(errorMessages.notFound.replace("{0}", DailyReport.name));

        return report;
    }

    async createDailyReport(createDailyReportDto: CreateDailyReportDto) {
        const employee = await this.employeeModel.findById(createDailyReportDto.employee);

        if (!employee) throw new NotFoundException(errorMessages.notFound.replace("{0}", Employee.name));

        const calculatedDailyReportFields = this.getCalculatedDailyReportFields(
            employee,
            createDailyReportDto,
        );

        const dailyReport = new this.dailyModel({
            ...createDailyReportDto,
            ...calculatedDailyReportFields,
        });

        return dailyReport.save();
    }

    async updateDailyReport(id: string, updateDailyReportDto: UpdateDailyReportDto) {
        const dailyModel = await this.dailyModel.findById(id);

        if (!dailyModel) throw new NotFoundException(errorMessages.notFound.replace("{0}", DailyReport.name));

        Object.assign(dailyModel, updateDailyReportDto);

        const employee = await this.employeeModel.findById(dailyModel.employee);

        if (!employee) throw new NotFoundException(errorMessages.notFound.replace("{0}", Employee.name));

        Object.assign(dailyModel, this.getCalculatedDailyReportFields(employee, dailyModel));

        return dailyModel.save();
    }

    async deleteDailyReport(id: string) {
        const deleted = await this.dailyModel.findByIdAndDelete(id);

        if (!deleted) throw new NotFoundException(errorMessages.notFound.replace("{0}", DailyReport.name));
    }

    async deleteAllDailyReports() {
        const result = await this.dailyModel.deleteMany();

        return { deletedCount: result.deletedCount };
    }

    private getCalculatedDailyReportFields(employee: Employee, dailyReportInput: DailyReportInput) {
        const employeeBonus = dailyReportInput.employeeBonus ?? 0;
        const employeeTotalSalary = (employee.fixedSalary ?? 0) + employeeBonus;
        const totalRevenue = dailyReportInput.cashRevenue + dailyReportInput.terminalRevenue;
        const acquiringFee = dailyReportInput.terminalRevenue * toDecimalPercent(acquiringPercent);

        const calculatedDailyReportFields: DailyReportCalculated = {
            employeeTotalSalary: employeeTotalSalary,
            totalRevenue,
            acquiringFee: acquiringFee,
            netProfit: this.getNetProfit(
                totalRevenue,
                dailyReportInput.costOfGoods,
                dailyReportInput.productWriteOffs,
                employeeTotalSalary,
                acquiringFee,
            ),
            salaryPercent: percent(employeeTotalSalary, totalRevenue),
            costPercent: percent(dailyReportInput.costOfGoods, totalRevenue),
            writeOffPercent: percent(dailyReportInput.productWriteOffs, totalRevenue),
            cashPercent: percent(dailyReportInput.cashRevenue, totalRevenue),
            terminalPercent: percent(dailyReportInput.terminalRevenue, totalRevenue),
        };

        return calculatedDailyReportFields;
    }

    private getNetProfit(
        totalRevenue: number,
        costOfGoods: number,
        productWriteOffs: number,
        employeeTotalSalary: number,
        acquiringFee: number,
    ) {
        return totalRevenue - costOfGoods - productWriteOffs - employeeTotalSalary - acquiringFee;
    }
}
