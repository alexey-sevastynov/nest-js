import { v4 } from "uuid";

export function createId() {
    const newIdUuid4 = v4();

    return newIdUuid4;
}
