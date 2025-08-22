export const taskPriorityKeys = {
    low: "low",
    medium: "medium",
    high: "high",
} as const;

export type TaskPriorityKey = (typeof taskPriorityKeys)[keyof typeof taskPriorityKeys];
