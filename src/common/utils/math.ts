export function percent(part: number, whole: number, precision = 2) {
    if (whole === 0) return 0;

    return parseFloat(((part / whole) * 100).toFixed(precision));
}

export function toDecimalPercent(percent: number) {
    return percent / 100;
}
