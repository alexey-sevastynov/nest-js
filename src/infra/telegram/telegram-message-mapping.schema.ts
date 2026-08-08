import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TelegramMessageMappingDocument = TelegramMessageMapping & Document;

@Schema({ timestamps: true })
export class TelegramMessageMapping {
    @Prop({ required: true, index: true })
    resourceId!: string;

    @Prop({ required: true })
    resourceType!: string;

    @Prop({ required: true })
    messageId!: number;

    @Prop({ required: true })
    chatId!: string;
}

export const TelegramMessageMappingSchema = SchemaFactory.createForClass(TelegramMessageMapping);
