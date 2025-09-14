import { ConflictException } from "@nestjs/common";
import { isObject } from "./guards";
import { errorMessages } from "../../common/constants/error-messages";

interface DuplicateKeyError extends Error {
    code: 11000;
    keyValue: Record<string, string>;
}

export function throwIfDuplicateKey(error: unknown) {
    if (isDuplicateKeyError(error)) {
        const duplicateEntry = error.keyValue;
        const duplicateField = Object.keys(duplicateEntry)[0];
        const duplicateValue = duplicateEntry[duplicateField];

        throw new ConflictException(
            errorMessages.fieldMustBeUnique
                .replace("{0}", humanizeFieldName(duplicateField))
                .replace("{1}", duplicateValue),
        );
    }

    throw error;
}

function isDuplicateKeyError(error: unknown): error is DuplicateKeyError {
    return isObject(error) && "code" in error && error.code === 11000 && "keyValue" in error;
}

function humanizeFieldName(field: string) {
    const withSpaces = field.replace(/([A-Z])/g, " $1");
    const trimmed = withSpaces.trim();
    const capitalized = trimmed.replace(/^./, (char) => char.toUpperCase());

    return capitalized;
}
