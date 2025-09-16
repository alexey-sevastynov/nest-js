import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class MailVerification extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    token: string;

    @Prop({ default: Date.now, expires: 3600 })
    createdAt: Date;
}

export const MailVerificationSchema = SchemaFactory.createForClass(MailVerification);
