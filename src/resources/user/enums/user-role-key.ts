export const userRoleKeys = {
    admin: "admin",
    user: "user",
    manager: "manager",
    guest: "guest",
} as const;

export type UserRoleKey = (typeof userRoleKeys)[keyof typeof userRoleKeys];
