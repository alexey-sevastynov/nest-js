import { BadRequestException } from "@nestjs/common";

export function parseNumber(value: unknown) {
    const num = Number(value);
    const valueAsString = JSON.stringify(value);

    if (isNaN(num)) {
        throw new BadRequestException(`Value must be a valid number. Received: ${valueAsString}`);
    }

    return num;
}
