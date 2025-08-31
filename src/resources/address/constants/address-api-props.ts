import { addressValidation } from "../constants/address-validation";

export const userIdApiProps = {
    type: String,
    required: true,
};

export const countryApiProps = {
    required: true,
    type: String,
    minLength: addressValidation.country.minLength,
    maxLength: addressValidation.country.maxLength,
    example: "Ukraine",
};

export const regionApiProps = {
    required: true,
    type: String,
    minLength: addressValidation.region.minLength,
    maxLength: addressValidation.region.maxLength,
    example: "Kyiv oblast",
};

export const cityApiProps = {
    required: true,
    type: String,
    minLength: addressValidation.city.minLength,
    maxLength: addressValidation.city.maxLength,
    example: "Kyiv",
};

export const streetApiProps = {
    required: true,
    type: String,
    minLength: addressValidation.street.minLength,
    maxLength: addressValidation.street.maxLength,
    example: "Shevchenka Street",
};

export const houseNumberApiProps = {
    required: true,
    type: String,
    minLength: addressValidation.houseNumber.minLength,
    maxLength: addressValidation.houseNumber.maxLength,
    example: "123A",
};

export const apartmentApiProps = {
    required: false,
    type: String,
    minLength: addressValidation.apartment.minLength,
    maxLength: addressValidation.apartment.maxLength,
    example: "12B",
};

export const postalCodeApiProps = {
    required: false,
    type: String,
    minLength: addressValidation.postalCode.minLength,
    maxLength: addressValidation.postalCode.maxLength,
    example: "49000",
};
