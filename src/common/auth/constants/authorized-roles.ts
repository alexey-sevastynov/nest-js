import { userRoleKeys } from "../../../resources/user/enums/user-role-key";

export const authorizedRoles = {
    adminOnly: [userRoleKeys.admin],
    coffeeShop: [userRoleKeys.admin, userRoleKeys.manager],
    registeredUser: [userRoleKeys.admin, userRoleKeys.user, userRoleKeys.manager],
} as const;
