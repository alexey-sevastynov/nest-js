import { type UserRoleKey } from "../../../resources/user/enums/user-role-key";

export type AuthJwtPayload = {
    id: string;
    userRole?: UserRoleKey;
    isGuest?: boolean;
    userId?: string;
    userName?: string;
};
