import { taskPriorityKeys } from "../enums/task-priority-key";
import { taskStatusKeys } from "../enums/task-status-key";
import { taskValidation } from "./validation";

export const taskIdApiProps = {
    description: "ID of the task",
    uniqueItems: true,
    example: 5,
};

export const taskTitleApiProps = {
    description: "Name of the task",
    minLength: taskValidation.title.minLength,
    maxLength: taskValidation.title.maxLength,
    example: "Setup aliases in NestJS",
};

export const taskDescriptionApiProps = {
    description: "Description of the task",
    minLength: taskValidation.description.minLength,
    maxLength: taskValidation.description.maxLength,
    example: "Add paths in tsconfig and configure tsconfig-paths",
};

export const taskStatusApiProps = {
    description: "Status of the task",
    enum: taskStatusKeys,
    example: taskStatusKeys.inProgress,
};

export const taskPriorityApiProps = {
    description: "Priority of the task",
    enum: taskPriorityKeys,
    example: taskPriorityKeys.low,
};

export const taskImportantApiProps = {
    description: "Is task important",
    required: false,
};

export const taskTagsApiProps = {
    description: "Tags of the task",
    required: false,
    uniqueItems: true,
};
