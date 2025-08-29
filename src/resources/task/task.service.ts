import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { tasks } from "./constants/tasks";
import { UpdateTaskDto } from "./dto/update-task-dto";
import { CreateTaskDto } from "./dto/create-task-dto";
import { errorMessages } from "../../common/constants/error-messages";

@Injectable()
export class TaskService {
    private allTasks = tasks;

    findAllTask() {
        return this.allTasks;
    }

    findByIdTask(id: number) {
        const task = this.allTasks.find((task) => task.id === id);

        if (!task) {
            throw new NotFoundException(
                errorMessages.notFoundWithId.replace("{0}", "Task").replace("{1}", id.toString()),
            );
        }

        return task;
    }

    createTask(task: CreateTaskDto) {
        if (!this.isIdUnique(task.id)) {
            throw new BadRequestException(errorMessages.mustBeUnique.replace("{0}", "Task ID"));
        }

        this.allTasks.push(task);

        return this.allTasks;
    }

    updateTask(id: number, dto: UpdateTaskDto) {
        const task = this.findByIdTask(id);

        Object.assign(task, dto);

        return task;
    }

    partialUpdateTask(id: number, dto: Partial<UpdateTaskDto>) {
        const task = this.findByIdTask(id);

        Object.assign(task, dto);

        return task;
    }

    deleteTask(id: number) {
        const task = this.findByIdTask(id);

        this.allTasks = this.allTasks.filter((item) => item.id !== task.id);

        return task;
    }

    private isIdUnique(id: number) {
        return !this.allTasks.some((t) => t.id === id);
    }
}
