import { ApiProperty } from "@nestjs/swagger";
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
    IsUUID,
    Length,
} from "class-validator";
import { type UserRoleKey, userRoleKeys } from "../enums/user-role-key";
import { type UserStatusKey, userStatusKeys } from "../enums/user-status-key";
import {
    blockReasonApiProps,
    emailApiProps,
    firstNameApiProps,
    lastNameApiProps,
    passwordApiProps,
    phoneNumberApiProps,
    userIdApiProps,
    userNameApiProps,
    userRoleApiProps,
    userStatusApiProps,
} from "../constants/user-api-props";
import { userValidation } from "../constants/user-validation";
import { BaseDto } from "../../../common/dto/base-dto";

export class CreateUserDto extends BaseDto {
    @ApiProperty(userIdApiProps)
    @IsNotEmpty()
    @IsString()
    @IsUUID("4", { message: "userId must be a valid UUID v4" })
    userId: string;

    @ApiProperty(userNameApiProps)
    @IsNotEmpty()
    @IsString()
    @Length(userValidation.userName.minLength, userValidation.userName.maxLength)
    userName: string;

    @ApiProperty(emailApiProps)
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty(passwordApiProps)
    @IsNotEmpty()
    @IsStrongPassword()
    @Length(userValidation.password.minLength, userValidation.password.maxLength)
    password: string;

    @ApiProperty(userRoleApiProps)
    @IsNotEmpty()
    @IsEnum(userRoleKeys)
    userRole: UserRoleKey;

    @ApiProperty(userStatusApiProps)
    @IsNotEmpty()
    @IsEnum(userStatusKeys)
    userStatus: UserStatusKey;

    @ApiProperty(blockReasonApiProps)
    @IsString()
    @Length(userValidation.blockReason.minLength, userValidation.blockReason.maxLength)
    blockReason?: string;

    @ApiProperty(firstNameApiProps)
    @IsString()
    @Length(userValidation.firstName.minLength, userValidation.firstName.maxLength)
    firstName?: string;

    @ApiProperty(lastNameApiProps)
    @IsString()
    @Length(userValidation.lastName.minLength, userValidation.lastName.maxLength)
    lastName?: string;

    @ApiProperty(phoneNumberApiProps)
    @IsPhoneNumber("UA")
    phoneNumber?: string;
}
