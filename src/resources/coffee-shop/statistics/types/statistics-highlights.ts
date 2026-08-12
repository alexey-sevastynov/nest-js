export interface StatisticsHighlights {
    revenue: MetricHighlight;
    netProfit: MetricHighlight;
    costPercent: MetricHighlight;
    writeOffPercent: MetricHighlight;
    cashRevenue: MetricHighlight;
    terminalRevenue: MetricHighlight;
}

export interface MetricHighlight {
    max: DailyStatisticHighlight;
    min: DailyStatisticHighlight;
}

export interface DailyStatisticHighlight {
    date: Date;
    value: number;
    employeeName: string;
}
