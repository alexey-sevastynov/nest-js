import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { tasks } from "@/task/constants/tasks";
import { taskErrorMessage } from "@/task/constants/task-error-message";
import { UpdateTaskDto } from "@/task/dto/update-task-dto";
import { CreateTaskDto } from "@/task/dto/create-task-dto";

@Injectable()
export class TaskService {
    private allTasks = tasks;

    findAll() {
        return this.allTasks;
    }

    findById(id: number) {
        const task = this.allTasks.find((task) => task.id === id);

        if (!task) {
            throw new NotFoundException(taskErrorMessage.notFound);
        }

        return task;
    }

    create(task: CreateTaskDto) {
        if (!this.isIdUnique(task.id)) {
            throw new BadRequestException(taskErrorMessage.idMustBeUnique);
        }

        this.allTasks.push(task);

        return this.allTasks;
    }

    update(id: number, dto: UpdateTaskDto) {
        const task = this.findById(id);

        Object.assign(task, dto);

        return task;
    }

    partialUpdate(id: number, dto: Partial<UpdateTaskDto>) {
        const task = this.findById(id);

        Object.assign(task, dto);

        return task;
    }

    delete(id: number) {
        const task = this.findById(id);

        this.allTasks = this.allTasks.filter((item) => item.id !== task.id);

        return task;
    }

    private isIdUnique(id: number) {
        return !this.allTasks.some((t) => t.id === id);
    }
}
