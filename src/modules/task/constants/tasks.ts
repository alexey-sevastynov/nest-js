import { Task } from "@modules/task/types/task";
import { taskStatusKeys } from "@modules/task/enums/task-status-keys";
import { taskPriorityKeys } from "@modules/task/enums/task-priority-keys";

export const tasks: Task[] = [
    {
        id: 1,
        title: "Setup aliases in NestJS",
        description: "Add paths in tsconfig and configure tsconfig-paths",
        status: taskStatusKeys.inProgress,
        priority: taskPriorityKeys.high,
        isImportant: true,
        tags: ["backend", "config"],
    },
    {
        id: 2,
        title: "Implement user CRUD",
        description: "Create controller, service and connect database",
        status: taskStatusKeys.todo,
        priority: taskPriorityKeys.medium,
        tags: ["backend", "api"],
    },
    {
        id: 3,
        title: "Write tests",
        description: "Cover main modules with unit and e2e tests",
        status: taskStatusKeys.todo,
        priority: taskPriorityKeys.low,
        isImportant: false,
    },
    {
        id: 4,
        title: "Update README",
        description: "Add instructions for running the project",
        status: taskStatusKeys.todo,
        priority: taskPriorityKeys.low,
        tags: ["docs"],
    },
];
