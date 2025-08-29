import mongoose from "mongoose";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { errorMessages } from "../../common/constants/error-messages";
import { WithObjectId } from "../../common/types/with-object-id";

export function validateMongoId(id: string, entityName: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
        throw new NotFoundException(errorMessages.invalidFormat.replace("{0}", entityName));
    }
}

export async function validateMongoUniqueForCreate<T, K extends keyof T>(
    model: mongoose.Model<T>,
    field: K,
    value: T[K],
    errorFieldName: string,
) {
    const query = buildQuery(field, value);
    const existing = await findExisting(model, query);

    if (existing) {
        throw new ConflictException(errorMessages.mustBeUnique.replace("{0}", errorFieldName));
    }
}

export async function validateMongoUniqueForUpdate<T, K extends keyof T>(
    model: mongoose.Model<T>,
    id: string,
    field: K,
    value: T[K],
    errorFieldName: string,
) {
    const query = buildQuery(field, value);
    const existing = await findExisting(model, query);

    if (existing && isDifferentId(existing._id, id)) {
        throw new ConflictException(errorMessages.mustBeUnique.replace("{0}", errorFieldName));
    }
}

export async function ensureMongoExists<T>(model: mongoose.Model<T>, id: string, entityName: string) {
    const doc = await model.findById(id).exec();

    if (!doc) {
        throw new NotFoundException(
            errorMessages.notFoundWithId.replace("{0}", entityName).replace("{1}", id),
        );
    }

    return doc;
}

function buildQuery<T, K extends keyof T>(field: K, value: T[K]) {
    const query: mongoose.FilterQuery<T> = { [field]: value } as mongoose.FilterQuery<T>;

    return query;
}

async function findExisting<T>(model: mongoose.Model<T>, query: mongoose.FilterQuery<T>) {
    const existing = await model.findOne<T & WithObjectId>(query).exec();

    return existing;
}

function isDifferentId(existingId: mongoose.Types.ObjectId, id: string) {
    const isDifferent = existingId.toString() !== id;

    return isDifferent;
}
