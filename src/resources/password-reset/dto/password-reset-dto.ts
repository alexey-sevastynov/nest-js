import { IsEmail, IsNotEmpty } from "class-validator";

export class RequestResetDto {
    @IsEmail()
    email: string;
}

export class ResetPasswordDto {
    @IsNotEmpty()
    token: string;

    newPassword: string;
}
