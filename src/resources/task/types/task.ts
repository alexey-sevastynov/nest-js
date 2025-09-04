import type { TaskPriorityKey } from "../enums/task-priority-key";
import type { TaskStatusKey } from "../enums/task-status-key";
import type { WithId } from "../../../common/types/with-id";

export interface Task extends WithId {
    title: string;
    description: string;
    status: TaskStatusKey;
    priority: TaskPriorityKey;
    isImportant?: boolean;
    tags?: string[];
}
