import { TaskPriorityKey } from "@/task/enums/task-priority-keys";
import { TaskStatusKey } from "@/task/enums/task-status-keys";
import { Task } from "@/task/types/task";

export class CreateTaskDto implements Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatusKey;
    priority: TaskPriorityKey;
}
