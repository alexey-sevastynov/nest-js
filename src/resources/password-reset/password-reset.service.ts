import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document } from "mongoose";
import * as bcrypt from "bcryptjs";
import { User } from "../../resources/user/user-schema";
import { MailVerificationService } from "../../resources/mail-verification/mail-verification.service";
import { errorMessages } from "../../common/constants/error-messages";
import { PasswordActionResponse } from "./types/passport-action-response";

interface JwtPayload {
    sub: string;
    email: string;
}

@Injectable()
export class PasswordResetService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly mailVerificationService: MailVerificationService,
        @InjectModel(User.name) private readonly userModel: Model<User & Document>,
    ) {}

    verifyResetToken(token: string): JwtPayload {
        try {
            return this.jwtService.verify(token);
        } catch {
            throw new UnauthorizedException(errorMessages.invalidOrExpiredToken);
        }
    }

    async requestResetPassword(email: string) {
        try {
            const { token, userId } = await this.generateResetToken(email);

            await this.mailVerificationService.sendPasswordResetEmail(email, token, userId);

            return this.createSuccessResponse("Password reset email sent!");
        } catch (error) {
            if (error instanceof NotFoundException) {
                return this.createFailureResponse(errorMessages.notFound.replace("{0}", User.name));
            }

            return this.createFailureResponse("Failed to send password reset email");
        }
    }

    async confirmResetPassword(token: string, newPassword: string) {
        try {
            const payload = this.verifyResetToken(token);
            const user = await this.userModel.findById(payload.sub);

            if (!user) {
                return this.createFailureResponse(errorMessages.notFound.replace("{0}", User.name));
            }

            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            return this.createSuccessResponse("Password updated successfully!");
        } catch {
            return this.createFailureResponse("Failed to reset password");
        }
    }

    private async generateResetToken(email: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) throw new NotFoundException(errorMessages.notFound.replace("{0}", User.name));

        const token = this.jwtService.sign({ sub: user._id, email: user.email }, { expiresIn: "15m" });

        return { token, userId: user._id as string };
    }

    private createSuccessResponse(message: string) {
        const successResponse: PasswordActionResponse = {
            success: true,
            notificationMessage: message,
        };

        return successResponse;
    }

    private createFailureResponse(message: string) {
        const failureResponse: PasswordActionResponse = {
            success: false,
            notificationMessage: message,
        };

        return failureResponse;
    }
}
