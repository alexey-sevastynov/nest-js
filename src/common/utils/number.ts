export function roundToPrecision(value: number, decimals = 2) {
    return Number(value.toFixed(decimals));
}

export function formatPercent(value: number, decimals = 2) {
    const percentFormatter = new Intl.NumberFormat("uk-UA", {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
    });

    return `${percentFormatter.format(value)} %`;
}

export function formatNumber(value: number, decimals = 0) {
    const numberFormatter = new Intl.NumberFormat("uk-UA", {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
    });

    return numberFormatter.format(value);
}
