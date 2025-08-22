import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TaskService } from "@/task/task.service";
import { CreateTaskDto } from "@/task/dto/create-task-dto";

@Controller("tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.taskService.findById(Number(id));
    }

    @Post()
    create(@Body() dto: CreateTaskDto) {
        return this.taskService.create(dto);
    }
}
