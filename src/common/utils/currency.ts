export function formatUah(value: number) {
    return formatCurrency(value, "UAH", "uk-UA");
}

export function formatUsd(value: number) {
    return formatCurrency(value, "USD", "en-US");
}

export function formatCurrency(value: number, currency: string, locale = "uk-UA") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(value);
}

export function formatExchangeRate(rate: number, baseCurrency: string, quoteCurrency: string) {
    const formattedRate = new Intl.NumberFormat("uk-UA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
    }).format(rate);

    return `1 ${baseCurrency.toUpperCase()} = ${formattedRate} ${quoteCurrency.toUpperCase()}`;
}
