import { Injectable, NotFoundException } from "@nestjs/common";
import { tasks } from "@/task/constants/tasks";
import { taskErrorMessage } from "@/task/constants/task-error-message";
import { Task } from "@/task/types/task";
import { UpdateTaskDto } from "@/task/dto/update-task-dto";

@Injectable()
export class TaskService {
    private allTasks = tasks;

    findAll() {
        return this.allTasks;
    }

    findById(id: number) {
        const task = this.allTasks.find((task) => task.id === id);

        if (!task) {
            throw new NotFoundException(taskErrorMessage.taskNotFound);
        }

        return task;
    }

    create(task: Task) {
        this.allTasks.push(task);

        return this.allTasks;
    }

    update(id: number, dto: UpdateTaskDto) {
        const task = this.findById(id);

        task.title = dto.title;
        task.description = dto.description;
        task.status = dto.status;
        task.priority = dto.priority;

        return task;
    }

    partialUpdate(id: number, dto: Partial<UpdateTaskDto>) {
        const task = this.findById(id);

        Object.assign(task, dto);

        return task;
    }
}
