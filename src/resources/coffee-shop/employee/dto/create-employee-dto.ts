import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean } from "class-validator";
import { type EmployeePositionKey, employeePositionKeys } from "../enums/employee-position-key";

export class CreateEmployeeDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(employeePositionKeys)
    position?: EmployeePositionKey;

    @IsOptional()
    @IsNumber()
    fixedSalary?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: number;
}
