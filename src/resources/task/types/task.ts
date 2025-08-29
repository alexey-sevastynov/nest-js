import { TaskPriorityKey } from "../enums/task-priority-key";
import { TaskStatusKey } from "../enums/task-status-key";
import { WithId } from "../../../common/types/with-id";

export interface Task extends WithId {
    title: string;
    description: string;
    status: TaskStatusKey;
    priority: TaskPriorityKey;
    isImportant?: boolean;
    tags?: string[];
}
