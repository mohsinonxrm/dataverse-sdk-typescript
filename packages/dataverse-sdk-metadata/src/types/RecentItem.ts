import type { RecentlyViewedRecordType } from "./RecentlyViewedRecordType.js";

/**
 * RecentItem
 */
export interface RecentItem {
  DisplayName?: string;
  IconPath?: string;
  LastAccessedStr?: string;
  EntityTypeName?: string;
  ObjectId?: string;
  PinStatus?: boolean;
  RecordType?: RecentlyViewedRecordType;
  IsUserView?: boolean;
  Title?: string;
  IsDeleted?: boolean;
  ClusterPartitionId?: string;
}
