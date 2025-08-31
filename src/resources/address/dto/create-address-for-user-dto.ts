import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { addressValidation } from "../constants/address-validation";
import { ApiProperty } from "@nestjs/swagger";
import {
    countryApiProps,
    regionApiProps,
    cityApiProps,
    streetApiProps,
    houseNumberApiProps,
    apartmentApiProps,
    postalCodeApiProps,
} from "../constants/address-api-props";

export class CreateAddressForUserDto {
    @ApiProperty(countryApiProps)
    @IsNotEmpty()
    @IsString()
    @Length(addressValidation.country.minLength, addressValidation.country.maxLength)
    country: string;

    @ApiProperty(regionApiProps)
    @IsNotEmpty()
    @IsString()
    @Length(addressValidation.region.minLength, addressValidation.region.maxLength)
    region: string;

    @ApiProperty(cityApiProps)
    @IsNotEmpty()
    @IsString()
    @Length(addressValidation.city.minLength, addressValidation.city.maxLength)
    city: string;

    @ApiProperty(streetApiProps)
    @IsNotEmpty()
    @IsString()
    @Length(addressValidation.street.minLength, addressValidation.street.maxLength)
    street: string;

    @ApiProperty(houseNumberApiProps)
    @IsNotEmpty()
    @IsString()
    @Length(addressValidation.houseNumber.minLength, addressValidation.houseNumber.maxLength)
    houseNumber: string;

    @ApiProperty(apartmentApiProps)
    @IsOptional()
    @IsString()
    @Length(addressValidation.apartment.minLength, addressValidation.apartment.maxLength)
    apartment?: string;

    @ApiProperty(postalCodeApiProps)
    @IsOptional()
    postalCode?: string;
}
