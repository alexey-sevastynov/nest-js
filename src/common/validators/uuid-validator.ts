import { HttpException } from "@nestjs/common";
import { validate, version } from "uuid";
import { errorMessages } from "../../common/constants/error-messages";

export function validateUuidV4(value: string, fieldName: string) {
    const isFormatUuid = validate(value);
    const isVersionUuid = version(value) === 4;

    if (!isFormatUuid || !isVersionUuid) {
        throw new HttpException(errorMessages.invalidFormat.replace("{0}", fieldName), 400);
    }
}
