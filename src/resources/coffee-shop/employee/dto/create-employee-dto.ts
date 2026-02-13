import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean } from "class-validator";
import { type EmployeePositionKey, employeePositionKeys } from "../enums/employee-position-key";

export class CreateEmployeeDto {
    @IsString()
    name: string;

    @IsEnum(employeePositionKeys)
    position: EmployeePositionKey;

    @IsOptional()
    @IsNumber()
    fixedSalary?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: number;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    birthDate?: string;

    @IsOptional()
    @IsString()
    employmentStartDate?: string;

    @IsOptional()
    @IsString()
    employmentEndDate?: string;
}
