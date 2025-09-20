import { Body, Controller, Post, Res } from "@nestjs/common";
import { type Response } from "express";
import { MailVerificationService } from "./mail-verification.service";
import { setCookie } from "../../common/utils/cookie/cookies";
import { cookieKeys } from "../../common/utils/cookie/cookie-key";
import { errorMessages } from "../../common/constants/error-messages";

@Controller("mail-verification")
export class MailVerificationController {
    constructor(private readonly mailService: MailVerificationService) {}

    @Post("confirm")
    async confirm(@Body("token") token: string, @Res() response: Response) {
        const isValid = await this.mailService.confirmToken(token);

        if (!isValid) {
            return response.status(400).json(errorMessages.invalidToken);
        }

        setCookie(response, cookieKeys.isVerified, "true");

        return response.json({ success: true });
    }
}
