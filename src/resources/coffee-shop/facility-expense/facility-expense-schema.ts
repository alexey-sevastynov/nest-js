import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type FacilityExpenseDocument = FacilityExpense & Document;

@Schema({ timestamps: true })
export class FacilityExpense {
    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    amount!: number;

    @Prop({ required: true })
    date!: Date;

    @Prop({ required: true })
    period!: Date;

    @Prop()
    description?: string;
}

export const FacilityExpenseSchema = SchemaFactory.createForClass(FacilityExpense);
