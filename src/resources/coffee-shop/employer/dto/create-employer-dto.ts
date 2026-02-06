import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean } from "class-validator";
import { type EmployerPositionKey, employerPositionKeys } from "../enums/employer-position-key";

export class CreateEmployerDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(employerPositionKeys)
    position?: EmployerPositionKey;

    @IsOptional()
    @IsNumber()
    fixedSalary?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: number;
}
