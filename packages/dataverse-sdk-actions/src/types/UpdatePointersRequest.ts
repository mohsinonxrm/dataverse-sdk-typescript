/**
 * UpdatePointersRequest complex type
 */
export interface UpdatePointersRequest {
  FilePointer?: string;
  FileSize?: number;
  IsCmkEnabled?: boolean;
  OrganizationId?: string;
  Otc?: number;
  Prefix?: string;
  ScaleGroupId?: string;
  SetBodyToNull?: boolean;
  StoragePointer?: number;
  TargetObjectId?: string;
  VersionNumber?: number;
}
