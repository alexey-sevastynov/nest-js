import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeService } from "./employee.service";
import { Employee, EmployeeSchema } from "./employee-schema";
import { EmployeeController } from "./employee.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])],
    controllers: [EmployeeController],
    providers: [EmployeeService],
    exports: [EmployeeService],
})
export class EmployeeModule {}
