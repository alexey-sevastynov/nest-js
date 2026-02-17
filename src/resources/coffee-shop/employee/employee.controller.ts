import { Controller, Get, Post, Delete, Body, Param, UsePipes, ValidationPipe, Patch } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeDto } from "./dto/create-employee-dto";
import { UpdateEmployeeDto } from "./dto/update-employee-dto";

@Controller("coffee-shop/employees")
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    findAll() {
        return this.employeeService.findEmployee();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.employeeService.findByIdEmployee(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() dto: CreateEmployeeDto) {
        return this.employeeService.createEmployee(dto);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateEmployeeDto) {
        return this.employeeService.updateEmployee(id, dto);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.employeeService.deleteEmployee(id);
    }

    @Delete()
    deleteAll() {
        return this.employeeService.deleteAllEmployee();
    }
}
