import { Injectable, NotFoundException } from "@nestjs/common";
import { tasks } from "@/task/constants/tasks";
import { taskErrorMessage } from "@/task/constants/task-error-message";

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
}
