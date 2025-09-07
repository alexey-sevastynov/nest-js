import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "../../../resources/user/dto/create-user-dto";

const signInFields = ["email", "password"] as const;

export class SignInDto extends PickType(CreateUserDto, signInFields) {}
