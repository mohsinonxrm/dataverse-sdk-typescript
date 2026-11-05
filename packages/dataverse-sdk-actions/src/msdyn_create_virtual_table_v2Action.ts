import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_create_virtual_table_v2 action
 */
export interface msdyn_create_virtual_table_v2Response {
  virtual_table_id: string;
}

/**
 * msdyn_create_virtual_table_v2 action
 *
 * Unbound action
 */
export class msdyn_create_virtual_table_v2Action implements Executable<msdyn_create_virtual_table_v2Response> {
  constructor(
    public readonly virtual_table_columns: Record<string, unknown>[],
    public readonly dataset_value: string,
    public readonly virtual_table_schema_name: string,
    public readonly virtual_table_name: string,
    public readonly datasource_id: string,
    public readonly solution_id: string,
    public readonly connectionreference_id: string,
    public readonly datasource_name: string,
    public readonly use_environment_variable_for_dataset: boolean,
    public readonly primary_field_name: string,
    public readonly virtual_table_plural_name: string,
    public readonly virtual_table_external_name: string,
    public readonly environment_variable_names: Record<string, unknown>[],
    public readonly environment_id: string,
    public readonly connection_id: string,
    public readonly primary_key_name: string,
    public readonly connectionreference_display_name: string,
    public readonly connectionreference_logical_name: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_create_virtual_table_v2`;

    const body: Record<string, unknown> = {
      virtual_table_columns: this.virtual_table_columns,
      dataset_value: this.dataset_value,
      virtual_table_schema_name: this.virtual_table_schema_name,
      virtual_table_name: this.virtual_table_name,
      datasource_id: this.datasource_id,
      solution_id: this.solution_id,
      connectionreference_id: this.connectionreference_id,
      datasource_name: this.datasource_name,
      use_environment_variable_for_dataset: this.use_environment_variable_for_dataset,
      primary_field_name: this.primary_field_name,
      virtual_table_plural_name: this.virtual_table_plural_name,
      virtual_table_external_name: this.virtual_table_external_name,
      environment_variable_names: this.environment_variable_names,
      environment_id: this.environment_id,
      connection_id: this.connection_id,
      primary_key_name: this.primary_key_name,
      connectionreference_display_name: this.connectionreference_display_name,
      connectionreference_logical_name: this.connectionreference_logical_name,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_create_virtual_table_v2Response> {
    const data = await response.json();
    return data as msdyn_create_virtual_table_v2Response;
  }
}
