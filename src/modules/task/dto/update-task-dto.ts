import { IsArray, IsBoolean, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { type TaskPriorityKey, taskPriorityKeys } from "../enums/task-priority-keys";
import { type TaskStatusKey, taskStatusKeys } from "../enums/task-status-keys";
import { Task } from "../types/task";
import { taskValidation } from "../constants/validation";
import { UniqueArray } from "../../../common/decorators/unique-array";
import { taskErrorMessage } from "../constants/task-error-message";

export class UpdateTaskDto implements Partial<Task> {
    @Length(taskValidation.title.minLength, taskValidation.title.maxLength)
    @IsString()
    title: string;

    @Length(taskValidation.description.minLength, taskValidation.description.maxLength)
    @IsString()
    description: string;

    @IsEnum(taskStatusKeys)
    status: TaskStatusKey;

    @IsEnum(taskPriorityKeys)
    priority: TaskPriorityKey;

    @IsOptional()
    @IsBoolean()
    isImportant: boolean;

    @IsArray()
    @IsString({ each: true })
    @UniqueArray({ message: taskErrorMessage.tagsMustBeUnique })
    @IsOptional()
    tags: string[];
}
