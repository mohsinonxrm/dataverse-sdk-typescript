import type { UpgradeCurrencyTypeTable } from "./UpgradeCurrencyTypeTable.js";

/**
 * UpgradeCurrencyTypeStatus complex type
 */
export interface UpgradeCurrencyTypeStatus {
  TotalTableCount: number;
  PendingTableCount: number;
  InProgressTableCount: number;
  CompletedTableCount: number;
  TableOrColumnDeletedAfterUpgradeTableCount: number;
  FailedTableCount: number;
  UpgradeStatus: string;
  StartTime: string;
  LastUpdatedTime: string;
  Tables: UpgradeCurrencyTypeTable[];
}
