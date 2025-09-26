import { Controller, Post, Body } from "@nestjs/common";
import { PasswordResetService } from "./password-reset.service";
import { RequestResetDto, ResetPasswordDto } from "./dto/password-reset-dto";

@Controller("password-reset")
export class PasswordResetController {
    constructor(private readonly passwordResetService: PasswordResetService) {}

    @Post("request")
    async requestReset(@Body() dto: RequestResetDto) {
        return this.passwordResetService.requestResetPassword(dto.email);
    }

    @Post("confirm")
    async confirmReset(@Body() dto: ResetPasswordDto) {
        return this.passwordResetService.confirmResetPassword(dto.token, dto.newPassword);
    }
}
