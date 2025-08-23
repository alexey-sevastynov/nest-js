import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Length,
} from "class-validator";
import { type TaskPriorityKey, taskPriorityKeys } from "@modules/task/enums/task-priority-keys";
import { type TaskStatusKey, taskStatusKeys } from "@modules/task/enums/task-status-keys";
import { Task } from "@modules/task/types/task";
import { taskValidation } from "@modules/task/constants/validation";
import { UniqueArray } from "@/common/decorators/unique-array";
import { taskErrorMessage } from "@modules/task/constants/task-error-message";

export class CreateTaskDto implements Task {
    @IsInt()
    @IsPositive()
    @IsNumber()
    id: number;

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
