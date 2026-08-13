import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { getRequiredEnv } from "../../../common/utils/infra/env-functions";
import { envKeys } from "../../../common/enums/infra/env-key";
import { KavappInventoryResponse } from "../types/inventory/kavapp-inventory-response";
import { KavappLoginResponse } from "../types/auth/kavapp-login-response";
import { kavappErrorMessages } from "../constants/kavapp-error-messages";
import { KavappLoginRequest } from "../types/auth/kavapp-login-request";
import { kavappEndpoints } from "../constants/kavapp-endpoints";

@Injectable()
export class KavappClient {
    private cachedToken: string | null = null;
    constructor(private readonly httpService: HttpService) {}

    async login() {
        const kavappLoginRequest: KavappLoginRequest = {
            email: getRequiredEnv(envKeys.kavappEmail),
            pass: getRequiredEnv(envKeys.kavappPassword),
        };

        try {
            const kavappLoginResponse = await firstValueFrom(
                this.httpService.post<KavappLoginResponse>(
                    `${getRequiredEnv(envKeys.kavappApiUrl)}${kavappEndpoints.login}`,
                    kavappLoginRequest,
                ),
            );

            if (kavappLoginResponse.data.error) {
                throw new HttpException(kavappErrorMessages.authenticationFailed, HttpStatus.UNAUTHORIZED);
            }

            this.cachedToken = kavappLoginResponse.data.data.token;

            return this.cachedToken;
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new HttpException(kavappErrorMessages.authenticationRequestFailed, HttpStatus.BAD_GATEWAY, {
                cause: error,
            });
        }
    }

    async getInventory(pointId?: string) {
        const defaultPointId = "1";
        const activePointId = pointId ?? defaultPointId;

        if (!this.cachedToken) await this.login();

        try {
            try {
                return await this.fetchInventory(this.cachedToken!, activePointId);
            } catch (error) {
                if (this.isUnauthorized(error)) {
                    this.cachedToken = null;

                    await this.login();

                    const kavappInventoryResponse = await this.fetchInventory(
                        this.cachedToken!,
                        activePointId,
                    );

                    return kavappInventoryResponse;
                }

                throw error;
            }
        } catch (error) {
            if (error instanceof HttpException) throw error;

            throw new HttpException(kavappErrorMessages.inventoryFetchFailed, HttpStatus.BAD_REQUEST, {
                cause: error,
            });
        }
    }

    private async fetchInventory(token: string, pointId: string): Promise<KavappInventoryResponse> {
        const kavappOldApiUrl = getRequiredEnv(envKeys.kavappOldApiUrl);
        const kavappParams = { params: { token } };

        const kavappInventoryResponse = await firstValueFrom(
            this.httpService.get<KavappInventoryResponse>(
                `${kavappOldApiUrl}${kavappEndpoints.inventory(pointId)}`,
                kavappParams,
            ),
        );

        return kavappInventoryResponse.data;
    }

    private isUnauthorized(error: unknown): boolean {
        if (error instanceof AxiosError) {
            return error.response?.status === 401 || error.response?.status === 403;
        }

        return false;
    }
}
