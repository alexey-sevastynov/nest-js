import { Types } from "mongoose";
import { v4 } from "uuid";

export function createId() {
    const newIdUuid4 = v4();

    return newIdUuid4;
}

export function createMongoId() {
    const mongoId = new Types.ObjectId();

    return mongoId;
}
