import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { type User } from "../../../resources/user/user-schema";
import { errorMessages } from "../../../common/constants/error-messages";

export async function validateUserPassword(user: User | null, password: string) {
    if (!user) {
        throw new UnauthorizedException(errorMessages.invalidEmail);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new UnauthorizedException(errorMessages.invalidPassword);
    }

    return user;
}
