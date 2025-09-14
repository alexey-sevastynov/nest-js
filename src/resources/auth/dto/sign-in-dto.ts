import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { emailApiProps, passwordApiProps } from "../constants/auth-api-props";

export class SignInDto {
    @ApiProperty(emailApiProps)
    @IsNotEmpty()
    email: string;

    @ApiProperty(passwordApiProps)
    @IsNotEmpty()
    password: string;
}
