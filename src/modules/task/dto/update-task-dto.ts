import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { type TaskPriorityKey, taskPriorityKeys } from "../enums/task-priority-key";
import { type TaskStatusKey, taskStatusKeys } from "../enums/task-status-key";
import { Task } from "../types/task";
import { taskValidation } from "../constants/validation";
import { UniqueArray } from "../../../common/decorators/unique-array";
import { taskErrorMessage } from "../constants/task-error-message";
import {
    taskDescriptionApiProps,
    taskImportantApiProps,
    taskPriorityApiProps,
    taskStatusApiProps,
    taskTagsApiProps,
    taskTitleApiProps,
} from "../constants/tasks-api-props";

export class UpdateTaskDto implements Partial<Task> {
    @ApiProperty(taskTitleApiProps)
    @Length(taskValidation.title.minLength, taskValidation.title.maxLength)
    @IsString()
    title: string;

    @ApiProperty(taskDescriptionApiProps)
    @Length(taskValidation.description.minLength, taskValidation.description.maxLength)
    @IsString()
    description: string;

    @ApiProperty(taskStatusApiProps)
    @IsEnum(taskStatusKeys)
    status: TaskStatusKey;

    @ApiProperty(taskPriorityApiProps)
    @IsEnum(taskPriorityKeys)
    priority: TaskPriorityKey;

    @ApiProperty(taskImportantApiProps)
    @IsOptional()
    @IsBoolean()
    isImportant: boolean;

    @ApiProperty(taskTagsApiProps)
    @IsArray()
    @IsString({ each: true })
    @UniqueArray({ message: taskErrorMessage.tagsMustBeUnique })
    @IsOptional()
    tags: string[];
}
