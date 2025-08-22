export const taskStatusKeys = {
    todo: "todo",
    inProgress: "inProgress",
    done: "done",
} as const;

export type TaskStatusKey = (typeof taskStatusKeys)[keyof typeof taskStatusKeys];
