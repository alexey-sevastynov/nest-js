import { Controller, Post, Body } from "@nestjs/common";
import { PasswordResetService } from "./password-reset.service";
import { MailVerificationService } from "../../resources/mail-verification/mail-verification.service";
import { RequestResetDto, ResetPasswordDto } from "./dto/password-reset-dto";

@Controller("password-reset")
export class PasswordResetController {
    constructor(
        private readonly passwordResetService: PasswordResetService,
        private readonly mailVerificationService: MailVerificationService,
    ) {}

    @Post("request")
    async requestReset(@Body() dto: RequestResetDto) {
        try {
            const { token, userId } = await this.passwordResetService.generateResetToken(dto.email);

            await this.mailVerificationService.sendPasswordResetEmail(dto.email, token, userId);

            return { success: true, notificationMessage: "Password reset email sent!" };
        } catch {
            return { success: false, notificationMessage: "Failed to generate reset token" };
        }
    }

    @Post("confirm")
    async confirmReset(@Body() dto: ResetPasswordDto) {
        return this.passwordResetService.resetPassword(dto.token, dto.newPassword);
    }
}
