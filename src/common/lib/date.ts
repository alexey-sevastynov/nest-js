export function getStartOfDay(date: Date | string) {
    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0);

    return parsedDate;
}

export function getEndOfDay(date: Date | string) {
    const parsedDate = new Date(date);
    parsedDate.setHours(23, 59, 59, 999);

    return parsedDate;
}
