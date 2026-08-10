import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { envKeys } from "../../common/enums/infra/env-key";
import { getRequiredEnv } from "../../common/utils/infra/env-functions";
import { methods } from "../../common/constants/network/methods";
import { httpHeaders } from "../../common/constants/network/http-headers";
import { contentTypes } from "../../common/constants/network/content-types";
import { parseJSONResponse, stringifyJSON } from "../../common/utils/json";
import { createRequestTimeout } from "../../common/utils/network/request-signal";
import { aiApiUrl, aiDefaults, aiErrorMessages, aiLogMessages } from "./constants";
import { type AiChatOptions, type OpenRouterRequestBody, type OpenRouterResponse } from "./types";

@Injectable()
export class AiService {
    private readonly logger = new Logger(AiService.name);
    private readonly apiKey: string;

    constructor(private readonly configService: ConfigService) {
        this.apiKey = getRequiredEnv(envKeys.openRouterApiKey, configService);
    }

    async chat(prompt: string, options?: AiChatOptions): Promise<string> {
        const model = options?.model ?? aiDefaults.model;
        const maxTokens = options?.maxTokens ?? aiDefaults.maxTokens;

        this.logger.log(aiLogMessages.chatRequest);

        const openRouterRequestBody: OpenRouterRequestBody = {
            model,
            max_tokens: maxTokens,
            messages: [{ role: "user", content: prompt }],
        };

        const responseData = await this.sendChatRequest(openRouterRequestBody);
        const content = responseData.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error(aiErrorMessages.emptyResponse);
        }

        this.logger.log(aiLogMessages.chatSuccess);

        return content;
    }

    private async sendChatRequest(requestBody: OpenRouterRequestBody) {
        const requestTimeout = createRequestTimeout();

        try {
            const response = await fetch(aiApiUrl, {
                method: methods.post,
                headers: {
                    [httpHeaders.authorization]: `Bearer ${this.apiKey}`,
                    [httpHeaders.contentType]: contentTypes.json,
                },
                signal: requestTimeout.signal,
                body: stringifyJSON(requestBody),
            });

            const openRouterResponse = await parseJSONResponse<OpenRouterResponse>(response);

            if (!response.ok || openRouterResponse.error) {
                throw new Error(
                    `${aiErrorMessages.apiError}: ${stringifyJSON(openRouterResponse.error ?? openRouterResponse)}`,
                );
            }

            return openRouterResponse;
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                throw new Error(aiErrorMessages.requestTimeout);
            }

            throw error;
        } finally {
            requestTimeout.cleanup();
        }
    }
}
