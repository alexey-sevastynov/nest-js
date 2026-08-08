export function parseJSON<T = unknown>(value: string) {
    return JSON.parse(value) as T;
}

export function stringifyJSON<T = unknown>(value: T) {
    return JSON.stringify(value);
}
