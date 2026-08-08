import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Reflector } from "@nestjs/core";
import { telegramNotifyMetadata } from "./telegram.decorator";
import { TelegramService } from "./telegram.service";
import { telegramActions } from "./constants";
import { TelegramNotifyOptions } from "./types";

interface ExpressRequest {
    params: Record<string, string>;
    body: Record<string, unknown>;
    [key: string]: unknown;
}

@Injectable()
export class TelegramInterceptor implements NestInterceptor<unknown, unknown> {
    private readonly logger = new Logger(TelegramInterceptor.name);

    constructor(
        private readonly reflector: Reflector,
        private readonly telegramService: TelegramService,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
        const handler = context.getHandler();
        const options = this.reflector.get<TelegramNotifyOptions>(telegramNotifyMetadata, handler);

        if (!options) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest<ExpressRequest>();

        return next.handle().pipe(
            tap({
                next: (response) => {
                    const responseObj = response as Record<string, unknown> | null;
                    this.handleNotification(options, request, responseObj).catch((err) => {
                        this.logger.error("Failed to send Telegram notification", err);
                    });
                },
            }),
        );
    }

    private async handleNotification(
        options: TelegramNotifyOptions,
        request: ExpressRequest,
        response: Record<string, unknown> | null,
    ): Promise<void> {
        const resourceId = request.params?.id;

        const data = response || request.body;

        if (options.action === telegramActions.create) {
            if (!data) return;
            await this.telegramService.handleCreate(options.resource, data, options.message);
        } else if (options.action === telegramActions.update) {
            if (!resourceId) return;
            await this.telegramService.handleUpdate(options.resource, resourceId, data, options.message);
        } else if (options.action === telegramActions.delete) {
            if (!resourceId) return;
            await this.telegramService.handleDelete(String(resourceId));
        }
    }
}
