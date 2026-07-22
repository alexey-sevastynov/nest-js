export interface OwnerWithdrawalPeriodStats {
    totalAmountUah: number;
    totalAmountUsd: number;
    count: number;
}

export interface OwnerWithdrawalSummary {
    selectedPeriod: OwnerWithdrawalPeriodStats;
    allTime: OwnerWithdrawalPeriodStats;
    exchangeRate: number;
    rateUpdatedAt: Date;
}
