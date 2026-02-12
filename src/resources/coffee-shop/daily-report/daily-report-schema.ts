import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Employer } from "../../../resources/coffee-shop/employer/employer-schema";

export type DailyReportDocument = DailyReport & Document;

@Schema({ timestamps: true })
export class DailyReport {
    @Prop({ required: true, unique: true })
    date: Date;

    @Prop({ required: true })
    cashRevenue: number;

    @Prop({ required: true })
    terminalRevenue: number;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Employer.name })
    employee: Employer;

    @Prop({ required: true })
    costOfGoods: number;

    @Prop({ required: true })
    productWriteOffs: number;

    @Prop({ default: 0 })
    employeeBonus: number;

    @Prop()
    employeeTotalSalary?: number;

    @Prop()
    acquiringFee?: number;

    @Prop()
    totalRevenue?: number;

    @Prop()
    netProfit?: number;

    @Prop()
    salaryPercent?: number;

    @Prop()
    costPercent?: number;

    @Prop()
    writeOffPercent?: number;

    @Prop()
    cashPercent?: number;

    @Prop()
    terminalPercent?: number;
}

export const DailyReportSchema = SchemaFactory.createForClass(DailyReport);
