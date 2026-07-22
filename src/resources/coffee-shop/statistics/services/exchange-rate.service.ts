import { Injectable, Logger } from "@nestjs/common";
import { isNumber } from "../../../../common/utils/guards";

export interface ExchangeRateResult {
    rate: number;
    updatedAt: Date;
}

interface NbuExchangeRateResponse {
    rate: number;
}

@Injectable()
export class ExchangeRateService {
    private readonly logger = new Logger(ExchangeRateService.name);
    private readonly nbuApiUrl =
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json";
    private readonly requestTimeoutMs = 5000;
    private readonly cacheTtlMs = 15 * 60 * 1000;
    private readonly fallbackRate = 41.4;

    private cache: ExchangeRateResult | null = null;

    async getUsdToUahRate(): Promise<ExchangeRateResult> {
        if (this.isCacheValid()) {
            return this.cache!;
        }

        const freshRate = await this.fetchRateFromNbu();
        if (freshRate) {
            this.cache = freshRate;
            return freshRate;
        }

        return this.cache ?? this.buildFallbackResult();
    }

    private isCacheValid(): boolean {
        if (!this.cache) {
            return false;
        }
        const age = Date.now() - this.cache.updatedAt.getTime();
        return age < this.cacheTtlMs;
    }

    private async fetchRateFromNbu(): Promise<ExchangeRateResult | null> {
        try {
            const response = await fetch(this.nbuApiUrl, {
                signal: AbortSignal.timeout(this.requestTimeoutMs),
            });

            if (!response.ok) {
                this.logger.warn(`NBU API returned status ${response.status}`);
                return null;
            }

            const data = (await response.json()) as NbuExchangeRateResponse[];
            const rate = data?.[0]?.rate;

            if (!isNumber(rate)) {
                this.logger.warn("NBU API returned unexpected payload shape", data);
                return null;
            }

            return { rate, updatedAt: new Date() };
        } catch (error) {
            this.logger.error("Failed to fetch USD exchange rate from NBU", error);
            return null;
        }
    }

    private buildFallbackResult(): ExchangeRateResult {
        return { rate: this.fallbackRate, updatedAt: new Date() };
    }
}
