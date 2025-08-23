import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
class UniqueArrayConstraint implements ValidatorConstraintInterface {
    validate(array: unknown[]) {
        return isArrayUnique(array);
    }

    defaultMessage() {
        return "Array must contain unique items";
    }
}

export function UniqueArray(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniqueArrayConstraint,
        });
    };
}

function isArrayUnique(array: unknown[]) {
    const isArray = Array.isArray(array);

    if (!isArray) return false;

    const uniqueItems = new Set(array);
    const isUnique = uniqueItems.size === array.length;

    return isUnique;
}
