import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Address } from "./address-schema";
import mongoose, { Model } from "mongoose";
import { CreateAddressDto } from "./dto/create-address-dto";
import { validateMongoId } from "../../common/validators/mongo-validator";
import { User } from "../../resources/user/user-schema";
import { ensureUniqueUserAddress, ensureUserExists } from "./validators/address-validator";
import { CreateAddressForUserDto } from "./dto/create-address-for-user-dto";

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Address.name) private readonly addressModel: Model<Address>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    findAllAddress() {
        return this.addressModel.find();
    }

    async findByIdAddress(id: string) {
        validateMongoId(id, Address.name);

        return this.addressModel.findById(id);
    }

    async createAddress({ userId, ...address }: CreateAddressDto) {
        await ensureUserExists(this.userModel, userId);
        await ensureUniqueUserAddress(this.addressModel, address, userId);

        const savedAddress = await this.createAndSaveAddress(address, userId);
        await this.attachAddressToUser(userId, savedAddress._id);
        const userAddresses = await this.getAllUserAddresses(userId);

        return userAddresses;
    }

    async deleteAddress(id: string) {
        validateMongoId(id, Address.name);

        return this.addressModel.findByIdAndDelete(id).exec();
    }

    async deleteAllAddresses() {
        const result = await this.addressModel.deleteMany().exec();

        return { deletedCount: result.deletedCount };
    }

    private async createAndSaveAddress(address: CreateAddressForUserDto, userId: string) {
        return this.addressModel.create({ ...address, userId });
    }

    private async attachAddressToUser(userId: string, addressId: mongoose.Types.ObjectId) {
        await this.userModel.updateOne({ userId }, { $push: { addresses: addressId } });
    }

    private async getAllUserAddresses(userId: string) {
        return this.addressModel.find({ userId }).exec();
    }
}
