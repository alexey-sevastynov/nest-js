import { Logger } from "@nestjs/common";
import { formatPercent } from "../../../common/utils/number";
import { formatUah } from "../../../common/utils/currency";
import { formatDateToLongDate } from "../../../common/utils/date/date";
import { timing } from "../../../common/constants/timing";
import { type AiService } from "../../../infra/ai/ai.service";
import { type DailyReport } from "./daily-report-schema";

const logger = new Logger("DailyReportTelegram");

function buildFallbackMessage(data: DailyReport): string {
    return `📅 *Щоденний звіт за ${formatDateToLongDate(data.date)}*

Працівник зміни: *${data.employee.name}*.

Загальний обсяг виручки за день становить *${formatUah(data.totalRevenue!)}*. Частка готівкових розрахунків — *${formatUah(data.cashRevenue)} (${formatPercent(data.cashPercent!)})*,  безготівкових — *${formatUah(data.terminalRevenue)} (${formatPercent(data.terminalPercent!)})*. Витрати на банківський еквайринг склали *${formatUah(data.acquiringFee!)}*.

Структура витрат включає собівартість продукції — *${formatUah(data.costOfGoods)} (${formatPercent(data.costPercent!)})*,  списання продуктів — *${formatUah(data.productWriteOffs)} (${formatPercent(data.writeOffPercent!)})* та фонд оплати праці — *${formatUah(data.employeeTotalSalary!)} (${formatPercent(data.salaryPercent!)})*. 

📊 *Попередній фінансовий результат* за підсумками зміни становить *${formatUah(data.netProfit!)}*.

ℹ️ _Значення є попереднім і не враховує операційні витрати підприємства, зокрема орендну плату, комунальні послуги, податки, результати інвентаризації, амортизацію обладнання та інші адміністративні витрати._`;
}

function buildDailyReportPrompt(data: DailyReport): string {
    const date = formatDateToLongDate(data.date);

    return `Ти — фінансовий аналітик та копірайтер кав'ярні.
Підготуй короткий щоденний фінансовий звіт українською мовою для власника кав'ярні.

Дата звіту: ${date}.

Фінансові дані за зміну:

Працівник зміни: ${data.employee.name}

Загальна виручка: ${formatUah(data.totalRevenue!)}
Готівка: ${formatUah(data.cashRevenue)} (${formatPercent(data.cashPercent!)})
Безготівкові розрахунки: ${formatUah(data.terminalRevenue)} (${formatPercent(data.terminalPercent!)})
Банківський еквайринг: ${formatUah(data.acquiringFee!)}

Собівартість продукції: ${formatUah(data.costOfGoods)} (${formatPercent(data.costPercent!)})
Списання продуктів: ${formatUah(data.productWriteOffs)} (${formatPercent(data.writeOffPercent!)})
Фонд оплати праці: ${formatUah(data.employeeTotalSalary!)} (${formatPercent(data.salaryPercent!)})

Попередній фінансовий результат: ${formatUah(data.netProfit!)}

Бенчмарки для оцінки:

Food cost:
- менше 33% — ідеальний рівень;
- 33–36% — нормальний рівень;
- понад 36% — критичний рівень.

Списання продуктів:
- 1–3% — ідеальний рівень;
- 3–5% — нормальний рівень;
- понад 5% — критичний рівень.

Фонд оплати праці:
- 12–15% — ідеальний рівень;
- 15–20% — нормальний рівень;
- понад 22% — критичний рівень.

Виручка за зміну:
- менше 6 000 ₴ — низька, потребує уваги;
- 6 000–8 000 ₴ — нормальна;
- 8 000–10 000 ₴ — хороша;
- 10 000–11 000 ₴ — дуже хороша;
- понад 11 000 ₴ — відмінний результат.

Правила написання:
1. Пиши виключно українською мовою.
2. Починай звіт із точної дати та дня тижня, які відповідають полю "Дата звіту". День тижня визначай виключно на основі переданої дати.
3. "Дата звіту" є єдиним джерелом істини щодо дати зміни. Ніколи не змінюй її та не припускай, що зміна була вчора, сьогодні або в інший день.
4. Не використовуй відносні формулювання дати або часу, такі як "вчора", "сьогодні", "завтра", "вчорашня зміна", "сьогоднішня зміна" тощо. Завжди використовуй конкретну дату з поля "Дата звіту".
5. Не додавай привітання, звернення до власника або вступні фрази на кшталт "Доброго ранку", "Доброго дня" тощо. Звіт має одразу починатися з дати та дня тижня.
6. Обов'язково вкажи працівника зміни.
7. Покажи загальну виручку, готівкові та безготівкові розрахунки з відсотками та витрати на еквайринг.
8. Покажи собівартість, списання продуктів та фонд оплати праці з відсотками.
9. Покажи попередній фінансовий результат. Завжди називай його саме попереднім.
10. Не просто перелічуй показники — коротко аналізуй їх відносно бенчмарків.
11. Хороші показники відзначай коротко. Погані або критичні — прямо позначай як такі.
12. Оцінюй результат зміни комплексно, а не за одним показником.
13. Не вигадуй причини, висновки або цифри, яких немає у вхідних даних.
14. Використовуй Telegram Markdown: *bold* для ключових фінансових значень. Не виділяй жирним кожне слово.
15. Звіт має бути коротким, професійним і зручним для читання з телефона.
16. Використовуй емодзі помірно.
17. НАЙВАЖЛИВІШЕ: кожен звіт має відрізнятися від попередніх. Варіюй формулювання, порядок блоків, стиль аналізу. Основна інформація однакова, але подача — завжди свіжа.
18. Ніколи не визначай дату зміни за часом отримання повідомлення, часом генерації звіту або контекстом розмови. Використовуй тільки передану "Дату звіту".
19. Якщо звіт створюється вранці, вдень або ввечері, це не впливає на дату зміни та не повинно змінювати формулювання дати.
20. Поверни ТІЛЬКИ готовий текст звіту без пояснень.`;
}

function sanitizeTelegramMarkdown(text: string): string {
    let sanitized = text.replace(/\\([_*[\]()~`>#+\-=|{}.!])/g, "$1");

    const boldCount = (sanitized.match(/\*/g) || []).length;

    if (boldCount % 2 !== 0) {
        const lastIndex = sanitized.lastIndexOf("*");
        sanitized = sanitized.slice(0, lastIndex) + sanitized.slice(lastIndex + 1);
    }

    return sanitized;
}

export const formatDailyReportMessage = (aiService: AiService) => async (data: DailyReport) => {
    try {
        const prompt = buildDailyReportPrompt(data);
        const response = await aiService.chat(prompt, { timeoutMs: timing.fiveSecondsInMilliseconds });

        return sanitizeTelegramMarkdown(response);
    } catch (error) {
        logger.warn("AI generation failed, using fallback template", (error as Error).message);

        return buildFallbackMessage(data);
    }
};
