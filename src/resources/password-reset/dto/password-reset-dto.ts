import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { emailApiProps, newPasswordApiProps, tokenApiProps } from "../constants/password-reset-api-property";

export class RequestResetDto {
    @ApiProperty(emailApiProps)
    @IsEmail()
    email: string;
}

export class ResetPasswordDto {
    @ApiProperty(tokenApiProps)
    @IsNotEmpty()
    token: string;

    @ApiProperty(newPasswordApiProps)
    @IsNotEmpty()
    newPassword: string;
}
