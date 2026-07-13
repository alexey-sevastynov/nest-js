import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateFacilityExpenseDto {
    @IsString()
    title!: string;

    @IsNumber()
    amount!: number;

    @IsDate()
    @Type(() => Date)
    date!: Date;

    @IsDate()
    @Type(() => Date)
    period!: Date;

    @IsOptional()
    @IsString()
    description?: string;
}
