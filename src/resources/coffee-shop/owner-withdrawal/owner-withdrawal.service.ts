import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateOwnerWithdrawalDto } from "./dto/create-owner-withdrawal-dto";
import { UpdateOwnerWithdrawalDto } from "./dto/update-owner-withdrawal-dto";
import { OwnerWithdrawal, OwnerWithdrawalDocument } from "./owner-withdrawal-schema";

@Injectable()
export class OwnerWithdrawalService {
    constructor(
        @InjectModel(OwnerWithdrawal.name)
        private readonly model: Model<OwnerWithdrawalDocument>,
    ) {}

    findAll() {
        return this.model.find().sort({ withdrawalDate: -1, createdAt: -1 });
    }

    async findById(id: string) {
        const withdrawal = await this.model.findById(id);

        if (!withdrawal) {
            throw new NotFoundException("OwnerWithdrawal not found");
        }

        return withdrawal;
    }

    create(dto: CreateOwnerWithdrawalDto) {
        return this.model.create(dto);
    }

    async update(id: string, dto: UpdateOwnerWithdrawalDto) {
        const withdrawal = await this.model.findByIdAndUpdate(id, dto, { new: true });

        if (!withdrawal) {
            throw new NotFoundException("OwnerWithdrawal not found");
        }

        return withdrawal;
    }

    async delete(id: string) {
        const deleted = await this.model.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException("OwnerWithdrawal not found");
        }

        return { success: true };
    }

    async deleteAll() {
        const result = await this.model.deleteMany();
        return { deletedCount: result.deletedCount };
    }
}
