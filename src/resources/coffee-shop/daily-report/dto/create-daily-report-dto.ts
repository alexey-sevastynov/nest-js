import { IsDate, IsNumber, IsOptional, IsMongoId } from "class-validator";
import { Type } from "class-transformer";

export class CreateDailyReportDto {
    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsNumber()
    cashRevenue: number;

    @IsNumber()
    terminalRevenue: number;

    @IsMongoId()
    employee: string;

    @IsNumber()
    costOfGoods: number;

    @IsNumber()
    productWriteOffs: number;

    @IsOptional()
    @IsNumber()
    employeeBonus?: number;
}
