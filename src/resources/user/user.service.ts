import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user-schema";
import mongoose, { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user-dto";
import { UpdateUserDto } from "./dto/update-user-dto";
import { validateMongoId } from "../../common/validators/mongo-validator";
import { ensureUserExists, validateUserForCreate, validateUserForUpdate } from "./validators/user-validator";
import { Address } from "../../resources/address/address-schema";
import { userProps } from "./constants/user-props";
import { CreateAddressForUserDto } from "../../resources/address/dto/create-address-for-user-dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Address.name) private readonly addressModel: Model<Address>,
    ) {}

    findAllUser() {
        return this.userModel.find().populate(userProps.addresses).exec();
    }

    async findByIdUser(id: string) {
        validateMongoId(id, User.name);
        const findUser = await ensureUserExists(this.userModel, id);

        return findUser.populate(userProps.addresses);
    }

    async createUser({ addresses, ...user }: CreateUserDto) {
        await validateUserForCreate(this.userModel, user);
        const createdUser = await this.createAndSaveUser(user);

        if (addresses?.length) {
            await this.createAndAttachAddresses(user.userId, createdUser._id, addresses);
        }

        return this.userModel.findById(createdUser._id).populate(userProps.addresses);
    }

    async updateUser(id: string, user: UpdateUserDto) {
        validateMongoId(id, User.name);
        await ensureUserExists(this.userModel, id);
        await validateUserForUpdate(this.userModel, id, user);

        return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    async partialUpdateUser(id: string, user: Partial<UpdateUserDto>) {
        validateMongoId(id, User.name);
        await ensureUserExists(this.userModel, id);
        await validateUserForUpdate(this.userModel, id, user);

        return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    async deleteUser(id: string) {
        validateMongoId(id, User.name);
        await ensureUserExists(this.userModel, id);

        return this.userModel.findByIdAndDelete(id).exec();
    }

    async deleteAllUsers() {
        const result = await this.userModel.deleteMany().exec();

        return { deletedCount: result.deletedCount };
    }

    private async createAndSaveUser(user: User) {
        const newUser = new this.userModel({
            ...user,
            userId: user.userId,
            addresses: [],
        });

        return newUser.save();
    }

    private async createAndAttachAddresses(
        userId: string,
        userObjectId: mongoose.Types.ObjectId,
        addresses: CreateAddressForUserDto[],
    ) {
        const addressDocs = await Promise.all(
            addresses.map((address) => new this.addressModel({ ...address, userId }).save()),
        );

        await this.userModel.updateOne(
            { _id: userObjectId },
            { $push: { addresses: { $each: addressDocs.map((a) => a._id) } } },
        );
    }
}
