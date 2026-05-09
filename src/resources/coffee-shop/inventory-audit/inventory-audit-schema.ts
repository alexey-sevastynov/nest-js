import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type InventoryAuditDocument = InventoryAudit & Document;

@Schema({
    timestamps: true,
})
export class InventoryAudit {
    @Prop({ required: true })
    title!: string;

    @Prop({ required: true, min: 0 })
    shortageAmount!: number;

    @Prop({ required: true, min: 0 })
    surplusAmount!: number;

    @Prop({ required: true })
    validFrom!: Date;

    @Prop({ required: true })
    validTo!: Date;

    @Prop()
    description?: string;
}

export const InventoryAuditSchema = SchemaFactory.createForClass(InventoryAudit);
