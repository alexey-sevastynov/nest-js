import { formatPercent } from "../../../common/utils/number";
import { formatUah } from "../../../common/utils/currency";
import { formatDateToLongDate } from "../../../common/utils/date/date";
import { type DailyReport } from "./daily-report-schema";

export const formatDailyReportMessage = () => (data: DailyReport) => {
    return `📅 *Щоденний звіт за ${formatDateToLongDate(data.date)}*

Працівник зміни: *${data.employee.name}*.

Загальний обсяг виручки за день становить *${formatUah(data.totalRevenue!)}*. Частка готівкових розрахунків — *${formatUah(data.cashRevenue)} (${formatPercent(data.cashPercent!)})*, безготівкових — *${formatUah(data.terminalRevenue)} (${formatPercent(data.terminalPercent!)})*. Витрати на банківський еквайринг склали *${formatUah(data.acquiringFee!)}*.

Структура витрат включає собівартість продукції — *${formatUah(data.costOfGoods)} (${formatPercent(data.costPercent!)})*, списання продуктів — *${formatUah(data.productWriteOffs)} (${formatPercent(data.writeOffPercent!)})* та фонд оплати праці — *${formatUah(data.employeeTotalSalary!)} (${formatPercent(data.salaryPercent!)})*.

📊 *Попередній фінансовий результат* за підсумками зміни становить *${formatUah(data.netProfit!)}*.

ℹ️ _Значення є попереднім і не враховує операційні витрати підприємства, зокрема орендну плату, комунальні послуги, податки, результати інвентаризації, амортизацію обладнання та інші адміністративні витрати._`;
};
