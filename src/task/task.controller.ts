import { Controller, Get, Param } from "@nestjs/common";
import { TaskService } from "@/task/task.service";

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
}
