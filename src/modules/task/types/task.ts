import { TaskPriorityKey } from "@modules/task/enums/task-priority-keys";
import { TaskStatusKey } from "@modules/task/enums/task-status-keys";
import { WithId } from "@/common/types/with-id";

export interface Task extends WithId {
    title: string;
    description: string;
    status: TaskStatusKey;
    priority: TaskPriorityKey;
    isImportant?: boolean;
    tags?: string[];
}
