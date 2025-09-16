import { nameOf } from "../../../common/utils/name-of";
import type { User } from "../user-schema";

export const userProps: Record<keyof User, string> = {
    userId: nameOf<User>("userId"),
    userName: nameOf<User>("userName"),
    email: nameOf<User>("email"),
    password: nameOf<User>("password"),
    userRole: nameOf<User>("userRole"),
    userStatus: nameOf<User>("userStatus"),
    isVerified: nameOf<User>("isVerified"),
    addresses: nameOf<User>("addresses"),
    blockReason: nameOf<User>("blockReason"),
    firstName: nameOf<User>("firstName"),
    lastName: nameOf<User>("lastName"),
    phoneNumber: nameOf<User>("phoneNumber"),
} as const;
