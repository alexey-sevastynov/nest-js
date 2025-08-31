import { nameOf } from "../../../common/utils/name-of";
import { Address } from "../address-schema";

export const addressProps: Record<keyof Address, string> = {
    userId: nameOf<Address>("userId"),
    street: nameOf<Address>("street"),
    city: nameOf<Address>("city"),
    region: nameOf<Address>("region"),
    country: nameOf<Address>("country"),
    houseNumber: nameOf<Address>("houseNumber"),
    apartment: nameOf<Address>("apartment"),
    postalCode: nameOf<Address>("postalCode"),
} as const;
