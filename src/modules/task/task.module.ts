import { Module } from "@nestjs/common";
import { TaskService } from "@modules/task/task.service";
import { TaskController } from "@modules/task/task.controller";

@Module({
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
