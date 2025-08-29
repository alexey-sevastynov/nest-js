import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task-dto";
import { UpdateTaskDto } from "./dto/update-task-dto";
import { parseNumber } from "../../common/utils/parse-number";

@Controller("tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    findAll() {
        return this.taskService.findAllTask();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        const idAsNumber = parseNumber(id);

        return this.taskService.findByIdTask(idAsNumber);
    }

    @Post()
    create(@Body() dto: CreateTaskDto) {
        return this.taskService.createTask(dto);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() dto: UpdateTaskDto) {
        const idAsNumber = parseNumber(id);

        return this.taskService.updateTask(idAsNumber, dto);
    }

    @Patch(":id")
    partialUpdate(@Param("id") id: string, @Body() dto: Partial<UpdateTaskDto>) {
        const idAsNumber = parseNumber(id);

        return this.taskService.partialUpdateTask(idAsNumber, dto);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        const idAsNumber = parseNumber(id);

        return this.taskService.deleteTask(idAsNumber);
    }
}
