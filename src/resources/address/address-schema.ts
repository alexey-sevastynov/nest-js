import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { addressValidation } from "./constants/address-validation";

@Schema({ timestamps: true })
export class Address {
    @Prop({ required: true, unique: false })
    userId: string;

    @Prop({
        required: true,
        trim: true,
        minLength: addressValidation.country.minLength,
        maxLength: addressValidation.country.maxLength,
    })
    country: string;

    @Prop({
        required: true,
        trim: true,
        minLength: addressValidation.region.minLength,
        maxLength: addressValidation.region.maxLength,
    })
    region: string;

    @Prop({
        required: true,
        trim: true,
        minLength: addressValidation.city.minLength,
        maxLength: addressValidation.city.maxLength,
    })
    city: string;

    @Prop({
        required: true,
        trim: true,
        minLength: addressValidation.street.minLength,
        maxLength: addressValidation.street.maxLength,
    })
    street: string;

    @Prop({
        required: true,
        minLength: addressValidation.houseNumber.minLength,
        maxLength: addressValidation.houseNumber.maxLength,
    })
    houseNumber: string;

    @Prop({
        required: false,
        minLength: addressValidation.apartment.minLength,
        maxLength: addressValidation.apartment.maxLength,
    })
    apartment?: string;

    @Prop({
        required: false,
        minLength: addressValidation.postalCode.minLength,
        maxLength: addressValidation.postalCode.maxLength,
    })
    postalCode?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
