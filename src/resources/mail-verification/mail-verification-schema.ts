import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { timing } from "../../common/constants/timing";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class MailVerification extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    token: string;

    @Prop({ default: Date.now, expires: timing.oneHourInSeconds })
    createdAt: Date;
}

export const MailVerificationSchema = SchemaFactory.createForClass(MailVerification);
