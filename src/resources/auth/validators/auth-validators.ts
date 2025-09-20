import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { type User } from "../../../resources/user/user-schema";
import { errorMessages } from "../../../common/constants/error-messages";
import { type WithObjectId } from "../../../common/types/with-object-id";

type UserWithObjectId = User & WithObjectId;

export async function verifyUserCredentials(user: UserWithObjectId | null, password: string) {
    if (!user) {
        throw new UnauthorizedException(errorMessages.invalidEmail);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new UnauthorizedException(errorMessages.invalidPassword);
    }

    return user;
}
