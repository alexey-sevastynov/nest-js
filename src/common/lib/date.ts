export function getStartOfDay(date: Date | string) {
    const parsedDate = new Date(date);
    parsedDate.setUTCHours(0, 0, 0, 0);

    return parsedDate;
}

export function getEndOfDay(date: Date | string) {
    const parsedDate = new Date(date);
    parsedDate.setUTCHours(23, 59, 59, 999);

    return parsedDate;
}

export function getStartOfMonth(date: Date | string) {
    const d = new Date(date);
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), 1));
}

export function formatMonthLabel(date: Date, locale = "uk-UA") {
    const monthName = date.toLocaleString(locale, {
        month: "long",
        timeZone: "UTC",
    });
    return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${date.getUTCFullYear()}`;
}
