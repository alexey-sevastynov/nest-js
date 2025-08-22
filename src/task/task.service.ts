import { Injectable } from "@nestjs/common";
import { tasks } from "@/task/constants/tasks";

@Injectable()
export class TaskService {
    private allTasks = tasks;

    findAll() {
        return this.allTasks;
    }
}
