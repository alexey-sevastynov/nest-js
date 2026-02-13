import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { employeePositionKeys, type EmployeePositionKey } from "./enums/employee-position-key";

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
    @Prop({ required: true })
    name: string;

    @Prop({ enum: employeePositionKeys })
    position?: EmployeePositionKey;

    @Prop()
    fixedSalary?: number;

    @Prop({ default: true })
    isActive: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
