import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe } from "@nestjs/common";
import { EmployerService } from "./employer.service";
import { CreateEmployerDto } from "./dto/create-employer-dto";
import { UpdateEmployerDto } from "./dto/update-employer-dto";

@Controller("coffee-shop/employers")
export class EmployerController {
    constructor(private readonly employerService: EmployerService) {}

    @Get()
    findAll() {
        return this.employerService.findAllDailyReport();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.employerService.findByIdEmployer(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() dto: CreateEmployerDto) {
        return this.employerService.createEmployer(dto);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() dto: UpdateEmployerDto) {
        return this.employerService.updateEmployer(id, dto);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.employerService.deleteEmployer(id);
    }

    @Delete()
    deleteAll() {
        return this.employerService.deleteAllEmployers();
    }
}
