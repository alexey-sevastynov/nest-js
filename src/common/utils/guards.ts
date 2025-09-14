import { typeNames } from "../../common/enums/infra/type-name";

export function isObject(value: unknown): value is object {
    return typeof value === typeNames.object && value !== null;
}

export function isString(value: unknown): value is string {
    return typeof value === typeNames.string;
}

export function isNumber(value: unknown): value is number {
    return typeof value === typeNames.number;
}

export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

export function isEmptyObject(obj: unknown) {
    return isObject(obj) && !Array.isArray(obj) && Object.keys(obj).length === 0;
}
