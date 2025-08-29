import mongoose from "mongoose";
import { User } from "../user-schema";
import { CreateUserDto } from "../dto/create-user-dto";
import { userProps } from "../constants/user-props";
import { validateUuidV4 } from "../../../common/validators/uuid-validator";
import {
    ensureMongoExists,
    validateMongoUniqueForCreate,
    validateMongoUniqueForUpdate,
} from "../../../common/validators/mongo-validator";
import { UpdateUserDto } from "../dto/update-user-dto";

export async function validateUserForCreate(model: mongoose.Model<User>, user: CreateUserDto) {
    validateUuidV4(user.userId, userProps.userId);

    await validateMongoUniqueForCreate(model, "userId", user.userId, userProps.userId);
    await validateMongoUniqueForCreate(model, "userName", user.userName, userProps.userName);
    await validateMongoUniqueForCreate(model, "email", user.email, userProps.email);

    if (user.phoneNumber) {
        await validateMongoUniqueForCreate(model, "phoneNumber", user.phoneNumber, userProps.phoneNumber);
    }
}

export async function validateUserForUpdate(
    model: mongoose.Model<User>,
    id: string,
    user: Partial<UpdateUserDto>,
) {
    if (user.userId) {
        validateUuidV4(user.userId, userProps.userId);
        await validateMongoUniqueForUpdate(model, id, "userId", user.userId, userProps.userId);
    }

    if (user.userName) {
        await validateMongoUniqueForUpdate(model, id, "userName", user.userName, userProps.userName);
    }

    if (user.email) {
        await validateMongoUniqueForUpdate(model, id, "email", user.email, userProps.email);
    }

    if (user.phoneNumber) {
        await validateMongoUniqueForUpdate(model, id, "phoneNumber", user.phoneNumber, userProps.phoneNumber);
    }
}

export async function ensureUserExists(userModel: mongoose.Model<User>, id: string) {
    return ensureMongoExists(userModel, id, User.name);
}
