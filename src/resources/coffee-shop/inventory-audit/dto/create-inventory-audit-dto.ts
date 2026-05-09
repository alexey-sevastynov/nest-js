import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateInventoryAuditDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    shortageAmount!: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    surplusAmount!: number;

    @IsDate()
    @Type(() => Date)
    validFrom!: Date;

    @IsDate()
    @Type(() => Date)
    validTo!: Date;

    @IsOptional()
    @IsString()
    description?: string;
}
