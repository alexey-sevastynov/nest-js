import type mongoose from "mongoose";
import { ConflictException } from "@nestjs/common";
import { ensureMongoFindOne } from "../../../common/validators/mongo-validator";
import { addressProps } from "../constants/address-props";
import type { User } from "../../../resources/user/user-schema";
import type { Address } from "../address-schema";
import type { CreateAddressForUserDto } from "../dto/create-address-for-user-dto";

export async function ensureUserExists(userModel: mongoose.Model<User>, userId: string) {
    return ensureMongoFindOne(userModel, { userId }, addressProps.userId);
}

export async function ensureUniqueUserAddress(
    addressModel: mongoose.Model<Address>,
    address: CreateAddressForUserDto,
    userId: string,
) {
    const existing = await addressModel.findOne({
        userId,
        country: address.country,
        region: address.region,
        city: address.city,
        street: address.street,
        houseNumber: address.houseNumber,
        apartment: address.apartment,
        postalCode: address.postalCode,
    });

    if (existing) {
        throw new ConflictException("This address already exists for the user");
    }
}
