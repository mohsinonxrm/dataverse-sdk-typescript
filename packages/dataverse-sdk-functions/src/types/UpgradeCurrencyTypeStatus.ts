import type { UpgradeCurrencyTypeTable } from "./UpgradeCurrencyTypeTable.js";

/**
 * UpgradeCurrencyTypeStatus complex type
 */
export interface UpgradeCurrencyTypeStatus {
  CompletedTableCount?: number;
  FailedTableCount?: number;
  InProgressTableCount?: number;
  LastUpdatedTime?: string;
  PendingTableCount?: number;
  StartTime?: string;
  TableOrColumnDeletedAfterUpgradeTableCount?: number;
  Tables?: UpgradeCurrencyTypeTable[];
  TotalTableCount?: number;
  UpgradeStatus?: string;
}
