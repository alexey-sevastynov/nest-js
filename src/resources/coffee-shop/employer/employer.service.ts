import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEmployerDto } from "./dto/create-employer-dto";
import { UpdateEmployerDto } from "./dto/update-employer-dto";
import { Employer, EmployerDocument } from "./employer-schema";

@Injectable()
export class EmployerService {
    constructor(@InjectModel(Employer.name) private readonly employerModel: Model<EmployerDocument>) {}

    findAll() {
        return this.employerModel.find().exec();
    }

    async findById(id: string) {
        const employer = await this.employerModel.findById(id).exec();

        if (!employer) throw new NotFoundException("Employer not found");

        return employer;
    }

    create(dto: CreateEmployerDto) {
        const employer = new this.employerModel(dto);

        return employer.save();
    }

    async update(id: string, dto: UpdateEmployerDto) {
        const updated = await this.employerModel.findByIdAndUpdate(id, dto, { new: true });

        if (!updated) throw new NotFoundException("Employer not found");

        return updated;
    }

    async delete(id: string) {
        const deleted = await this.employerModel.findByIdAndDelete(id);

        if (!deleted) throw new NotFoundException("Employer not found");
    }

    async deleteAll() {
        const result = await this.employerModel.deleteMany();

        return { deletedCount: result.deletedCount };
    }
}
