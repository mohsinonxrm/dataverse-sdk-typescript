import type { RecentlyViewedRecordType } from "./RecentlyViewedRecordType.js";

/**
 * RecentItem
 */
export interface RecentItem {
  AppId?: string;
  AppName?: string;
  ClusterPartitionId?: string;
  DisplayName?: string;
  EntityTypeName?: string;
  EnvironmentName?: string;
  IconPath?: string;
  IsDeleted?: boolean;
  IsUserView?: boolean;
  LastAccessedStr?: string;
  ObjectId?: string;
  PinStatus?: boolean;
  RecordType?: RecentlyViewedRecordType;
  Title?: string;
}
