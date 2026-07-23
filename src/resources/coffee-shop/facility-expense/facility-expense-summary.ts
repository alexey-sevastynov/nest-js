export interface FacilityExpenseSummary {
    targetAmount: number;
    collectedAmount: number;
    remainingAmount: number;
    progressPercentage: number;
    isFullyCollected: boolean;
    operationsCount: number;
    monthLabel: string;
    period: Date;
}
