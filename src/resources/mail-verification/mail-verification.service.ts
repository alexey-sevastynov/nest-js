import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { createId } from "../../common/utils/id-generator";
import { MailVerification } from "./mail-verification-schema";
import { User } from "../../resources/user/user-schema";
import { WithObjectId } from "../../common/types/with-object-id";
import { resetPasswordEmailHtml, verificationEmailHtml } from "./constants/verification-email-html";
import { sendMail } from "./mail-service";
import { getEnv } from "../../common/utils/infra/env-functions";
import { envKeys } from "../../common/enums/infra/env-key";

@Injectable()
export class MailVerificationService {
    constructor(
        @InjectModel(MailVerification.name) private readonly verificationModel: Model<MailVerification>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async sendVerificationEmail(userEmail: string, userId: WithObjectId) {
        const token = createId();

        await this.verificationModel.create({
            userId,
            token,
        });

        const verificationLink = `${getEnv(envKeys.frontendBaseUrl)}/auth/verify?token=${token}`;

        await sendMail({
            to: userEmail,
            subject: "Confirm Your Account",
            html: verificationEmailHtml(verificationLink),
        });

        return token;
    }

    async sendPasswordResetEmail(userEmail: string, token: string, userId?: string) {
        if (userId) {
            await this.verificationModel.create({
                userId,
                token,
                type: "password-reset",
                createdAt: new Date(),
            });
        }

        const resetLink = `${getEnv(envKeys.frontendBaseUrl)}/auth/reset-password?token=${token}`;

        await sendMail({
            to: userEmail,
            subject: "Reset Your Password",
            html: resetPasswordEmailHtml(resetLink),
        });
    }

    async confirmToken(token: string) {
        const record = await this.verificationModel.findOne({ token });

        if (!record) return false;

        await this.userModel.findByIdAndUpdate(record.userId, { isVerified: true });
        await this.verificationModel.deleteOne({ _id: record._id });

        return true;
    }
}
