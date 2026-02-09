/**
 * UpdatePointersRequest complex type
 */
export interface UpdatePointersRequest {
  Prefix: string;
  StoragePointer: number;
  FilePointer: string;
  FileSize: number;
  VersionNumber: number;
  Otc: number;
  TargetObjectId: string;
  SetBodyToNull: boolean;
  OrganizationId: string;
  ScaleGroupId: string;
  IsCmkEnabled: boolean;
}
