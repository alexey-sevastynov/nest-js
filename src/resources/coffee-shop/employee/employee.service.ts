import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEmployeeDto } from "./dto/create-employee-dto";
import { UpdateEmployeeDto } from "./dto/update-employee-dto";
import { Employee, EmployeeDocument } from "./employee-schema";
import { errorMessages } from "../../../common/constants/error-messages";

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>) {}

    findEmployee() {
        return this.employeeModel.find().exec();
    }

    async findByIdEmployee(id: string) {
        const employee = await this.employeeModel.findById(id).exec();

        if (!employee) throw new NotFoundException(errorMessages.notFound.replace("{0}", Employee.name));

        return employee;
    }

    createEmployee(dto: CreateEmployeeDto) {
        const employee = new this.employeeModel(dto);

        return employee.save();
    }

    async updateEmployee(id: string, dto: UpdateEmployeeDto) {
        const updated = await this.employeeModel.findByIdAndUpdate(id, dto, { new: true });

        if (!updated) throw new NotFoundException(errorMessages.notFound.replace("{0}", Employee.name));

        return updated;
    }

    async deleteEmployee(id: string) {
        const deleted = await this.employeeModel.findByIdAndDelete(id);

        if (!deleted) throw new NotFoundException(errorMessages.notFound.replace("{0}", Employee.name));
    }

    async deleteAllEmployee() {
        const result = await this.employeeModel.deleteMany();

        return { deletedCount: result.deletedCount };
    }
}
