import { Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Auth {
    email: string;
    password: string;
    name: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
