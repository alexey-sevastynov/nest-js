import { endOfDay, parseISO, startOfDay } from "date-fns";
import { isString } from "../../common/utils/guards";

export function startOfDayNormalized(date: Date | string) {
    return startOfDay(normalizeToDate(date));
}

export function endOfDayNormalized(date: Date | string) {
    return endOfDay(normalizeToDate(date));
}

function normalizeToDate(date: Date | string) {
    if (isString(date)) {
        const dateOnly = date.substring(0, 10);

        return parseISO(dateOnly);
    }

    return date;
}
