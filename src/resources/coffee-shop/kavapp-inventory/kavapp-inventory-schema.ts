import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { KavappInventoryItem } from "../../../integrations/kavapp/types/inventory/kavapp-inventory-item";

export type KavappInventorySnapshotDocument = KavappInventory & Document;

@Schema({ timestamps: true })
export class KavappInventory {
    @Prop({ required: true, default: () => new Date() })
    syncDate!: Date;

    @Prop({ required: true, type: [Object] })
    cup!: KavappInventoryItem[];

    @Prop({ required: true, type: [Object] })
    ingredient!: KavappInventoryItem[];

    @Prop({ required: true, type: [Object] })
    product!: KavappInventoryItem[];

    @Prop({ required: true, type: [Object] })
    kitchen!: KavappInventoryItem[];
}

export const KavappInventorySchema = SchemaFactory.createForClass(KavappInventory);
