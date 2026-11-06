/**
 * msdyn_CopyEntityResponse
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
