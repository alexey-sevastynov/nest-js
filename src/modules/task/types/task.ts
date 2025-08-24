import { TaskPriorityKey } from "../enums/task-priority-keys";
import { TaskStatusKey } from "../enums/task-status-keys";
import { WithId } from "../../../common/types/with-id";

export interface Task extends WithId {
    title: string;
    description: string;
    status: TaskStatusKey;
    priority: TaskPriorityKey;
    isImportant?: boolean;
    tags?: string[];
}
