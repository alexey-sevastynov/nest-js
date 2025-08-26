import { BadRequestException } from "@nestjs/common";
import { errorMessages } from "../../common/constants/error-messages";

export function parseNumber(value: unknown) {
    const num = Number(value);
    const valueAsString = JSON.stringify(value);

    if (isNaN(num)) {
        throw new BadRequestException(errorMessages.valueMustBeNumber.replace("{0}", valueAsString));
    }

    return num;
}
