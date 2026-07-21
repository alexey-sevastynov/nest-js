import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateOwnerWithdrawalDto {
    @IsDate()
    @Type(() => Date)
    withdrawalDate!: Date;

    @IsNumber()
    amount!: number;

    @IsOptional()
    @IsString()
    description?: string;
}
