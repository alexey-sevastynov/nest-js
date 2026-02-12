import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEmployerDto } from "./dto/create-employer-dto";
import { UpdateEmployerDto } from "./dto/update-employer-dto";
import { Employer, EmployerDocument } from "./employer-schema";
import { errorMessages } from "../../../common/constants/error-messages";

@Injectable()
export class EmployerService {
    constructor(@InjectModel(Employer.name) private readonly employerModel: Model<EmployerDocument>) {}

    findAllDailyReport() {
        return this.employerModel.find().exec();
    }

    async findByIdEmployer(id: string) {
        const employer = await this.employerModel.findById(id).exec();

        if (!employer) throw new NotFoundException(errorMessages.notFound.replace("{0}", Employer.name));

        return employer;
    }

    createEmployer(dto: CreateEmployerDto) {
        const employer = new this.employerModel(dto);

        return employer.save();
    }

    async updateEmployer(id: string, dto: UpdateEmployerDto) {
        const updated = await this.employerModel.findByIdAndUpdate(id, dto, { new: true });

        if (!updated) throw new NotFoundException(errorMessages.notFound.replace("{0}", Employer.name));

        return updated;
    }

    async deleteEmployer(id: string) {
        const deleted = await this.employerModel.findByIdAndDelete(id);

        if (!deleted) throw new NotFoundException(errorMessages.notFound.replace("{0}", Employer.name));
    }

    async deleteAllEmployers() {
        const result = await this.employerModel.deleteMany();

        return { deletedCount: result.deletedCount };
    }
}
