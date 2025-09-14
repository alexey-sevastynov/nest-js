import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../resources/user/user-schema";
import { createId } from "../../common/utils/id-generator";
import { userRoleKeys } from "../../resources/user/enums/user-role-key";
import { userStatusKeys } from "../../resources/user/enums/user-status-key";
import { SignUpDto } from "./dto/sign-up-dto";
import { SignInDto } from "./dto/sign-in-dto";
import { validateUserPassword } from "./validators/auth-validators";
import { throwIfDuplicateKey } from "../../common/utils/mongo-errors";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService,
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
            firstName: auth.firstName,
            lastName: auth.lastName,
            phoneNumber: auth.phoneNumber,
        };

        try {
            const user = await this.userModel.create(newUser);
            const authResponse = this.#createAuthResponse(user._id, user.userId, user.userName);

            return authResponse;
        } catch (error) {
            throwIfDuplicateKey(error);
        }
    }

    async signIn(auth: SignInDto) {
        const user = await this.userModel.findOne({ email: auth.email });
        await validateUserPassword(user, auth.password);
        const authResponse = this.#createAuthResponse(user!._id, user!.userId, user!.userName);

        return authResponse;
    }

    #createAuthResponse(mongoId: unknown, userId: string, userName: string) {
        const token = this.jwtService.sign({ id: mongoId });
        const response = { token, userId, userName };

        return response;
    }
}
