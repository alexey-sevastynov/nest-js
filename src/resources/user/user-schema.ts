import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { type UserRoleKey, userRoleKeys } from "./enums/user-role-key";
import { type UserStatusKey, userStatusKeys } from "./enums/user-status-key";

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    userId: string;

    @Prop({ required: true, unique: true })
    userName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: userRoleKeys.user, enum: userRoleKeys })
    userRole: UserRoleKey;

    @Prop({ required: true, default: userStatusKeys.active, enum: userStatusKeys })
    userStatus: UserStatusKey;

    @Prop({ required: false })
    blockReason?: string;

    @Prop({ required: false })
    firstName?: string;

    @Prop({ required: false })
    lastName?: string;

    @Prop({ required: false, unique: true })
    phoneNumber?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
