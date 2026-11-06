/**
 * msdyn_get_required_fieldsResponse complex type
 */
export interface msdyn_get_required_fieldsResponse {
  table_primary_key?: string;
  table_primary_field?: string;
  table_id?: string;
  table_plural_name?: string;
  eligible_primary_keys?: string[];
  eligible_primary_fields?: string[];
  table_display_name?: string;
  table_schema_name?: string;
  virtual_table_column_candidates?: Record<string, unknown>[];
}
