import { timing } from "../../constants/timing";
import { isServerlessMode } from "../infra/environment";

interface RequestSignal {
    signal?: AbortSignal;
    cleanup: VoidFunction;
}

export function createRequestTimeout(): RequestSignal {
    if (!isServerlessMode()) {
        return {
            signal: undefined,
            cleanup: () => undefined,
        };
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), timing.fiveSecondsInMilliseconds);

    return {
        signal: controller.signal,
        cleanup: () => clearTimeout(timeoutId),
    };
}
