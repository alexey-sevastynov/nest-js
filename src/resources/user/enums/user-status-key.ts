export const userStatusKeys = {
    active: "active",
    blocked: "blocked",
    pending: "pending",
    deleted: "deleted",
} as const;

export type UserStatusKey = (typeof userStatusKeys)[keyof typeof userStatusKeys];
