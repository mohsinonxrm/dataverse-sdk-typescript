/**
 * msdyn_CopyEntityResponse complex type
 */
export interface msdyn_CopyEntityResponse {
  Errors?: string;
  FieldsUpdated?: number;
  ProductsCopied?: number;
  ProductsSkipped?: number;
  StakeholdersCopied?: number;
  Success?: boolean;
  TargetEntityName?: string;
  TargetRecordId?: string;
}
