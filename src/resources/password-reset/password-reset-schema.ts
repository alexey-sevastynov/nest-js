import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class PasswordReset extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    tokenHash: string;

    @Prop({ required: true })
    expiresAt: Date;
}

export const PasswordResetSchema = SchemaFactory.createForClass(PasswordReset);
