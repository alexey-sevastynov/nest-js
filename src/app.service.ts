import { Injectable } from "@nestjs/common";
import { environments } from "./common/enums/environment";
import { isProd } from "./common/utils/infra/environment";

@Injectable()
export class AppService {
    getApiInfo() {
        return {
            appName: "Tasks API",
            version: "1.0.0",
            environment: isProd() ? environments.prod : environments.dev,
            startTime: new Date().toISOString(),
            endpoints: [
                { path: "/tasks", method: "GET", description: "Get all tasks" },
                { path: "/tasks/:id", method: "GET", description: "Get a task by ID" },
                { path: "/tasks", method: "POST", description: "Create a new task" },
                { path: "/tasks/:id", method: "PUT", description: "Update a task completely" },
                { path: "/tasks/:id", method: "PATCH", description: "Update a task partially" },
                { path: "/tasks/:id", method: "DELETE", description: "Delete a task" },
            ],
            taskSchema: {
                id: { type: "number", uniqueItems: true, required: true },
                title: { type: "string", required: true },
                description: { type: "string", required: true },
                status: {
                    type: "enum",
                    enum: ["todo", "inProgress", "done"],
                    required: true,
                },
                priority: {
                    type: "enum",
                    enum: ["low", "medium", "high"],
                    required: true,
                },
                isImportant: { type: "boolean", required: false },
                tags: { type: "array", uniqueItems: true, typeItems: "string", required: false },
            },
        };
    }
}
