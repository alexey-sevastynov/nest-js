import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../resources/user/user-schema";
import { createId, createMongoId } from "../../common/utils/id-generator";
import { UserRoleKey, userRoleKeys } from "../../resources/user/enums/user-role-key";
import { userStatusKeys } from "../../resources/user/enums/user-status-key";
import { SignUpDto } from "./dto/sign-up-dto";
import { SignInDto } from "./dto/sign-in-dto";
import { verifyUserCredentials } from "./validators/auth-validators";
import { throwIfDuplicateKey } from "../../common/utils/mongo-errors";
import { MailVerificationService } from "../../resources/mail-verification/mail-verification.service";
import { AuthResponse } from "./types/auth-response";
import { WithObjectId } from "../../common/types/with-object-id";
import { errorMessages } from "../../common/constants/error-messages";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService,
        private mailVerificationService: MailVerificationService,
    ) {}

    async signUp(auth: SignUpDto) {
        const hashedPassword = await bcrypt.hash(auth.password, 10);

        const newUser: User = {
            userId: createId(),
            userName: auth.userName,
            email: auth.email,
            password: hashedPassword,
            userRole: userRoleKeys.user,
            userStatus: userStatusKeys.active,
            isVerified: false,
            firstName: auth.firstName,
            lastName: auth.lastName,
            phoneNumber: auth.phoneNumber,
        };

        try {
            const user = await this.userModel.create(newUser);
            await this.#sendVerificationOrFail(user.email, user._id);

            const authResponse = this.#createAuthResponse(
                user._id,
                user.userId,
                user.userName,
                user.isVerified,
                user.userRole,
            );

            return authResponse;
        } catch (error) {
            throwIfDuplicateKey(error);
        }
    }

    async signIn(auth: SignInDto) {
        const findOneUser = await this.userModel.findOne({ email: auth.email });
        const user = await verifyUserCredentials(findOneUser, auth.password);

        if (!user.isVerified) {
            throw new UnauthorizedException(errorMessages.emailNotVerified);
        }

        const authResponse = this.#createAuthResponse(
            user._id,
            user.userId,
            user.userName,
            user.isVerified,
            user.userRole,
        );

        return authResponse;
    }

    signInAsGuest() {
        const authResponse: AuthResponse = this.#createAuthResponse(
            createMongoId(),
            createId(),
            "Guest",
            true,
            userRoleKeys.guest,
        );

        return authResponse;
    }

    #createAuthResponse(
        mongoId: unknown,
        userId: string,
        userName: string,
        isVerified = false,
        userRole: UserRoleKey,
    ) {
        const token = this.jwtService.sign({ id: mongoId });
        const response: AuthResponse = { token, userId, userName, isVerified, userRole };

        return response;
    }

    #sendVerificationOrFail = async (email: string, userId: WithObjectId) => {
        try {
            await this.mailVerificationService.sendVerificationEmail(email, userId);
        } catch {
            await this.userModel.findByIdAndDelete(userId);

            throw new UnauthorizedException(errorMessages.unableToSendVerificationEmail);
        }
    };
}
