import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user-schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user-dto";
import { UpdateUserDto } from "./dto/update-user-dto";
import { validateMongoId } from "../../common/validators/mongo-validator";
import { ensureUserExists, validateUserForCreate, validateUserForUpdate } from "./validators/user-validator";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    findAllUser() {
        return this.userModel.find().exec();
    }

    async findByIdUser(id: string) {
        validateMongoId(id, User.name);
        const findUser = await ensureUserExists(this.userModel, id);

        return findUser;
    }

    async createUser(user: CreateUserDto) {
        await validateUserForCreate(this.userModel, user);
        const newUser = new this.userModel(user);

        return newUser.save();
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
}
