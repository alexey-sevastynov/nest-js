import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { employerPositionKeys, type EmployerPositionKey } from "./enums/employer-position-key";

export type EmployerDocument = Employer & Document;

@Schema({ timestamps: true })
export class Employer {
    @Prop({ required: true })
    name: string;

    @Prop({ enum: employerPositionKeys })
    position?: EmployerPositionKey;

    @Prop()
    fixedSalary?: number;

    @Prop({ default: true })
    isActive: boolean;
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);
