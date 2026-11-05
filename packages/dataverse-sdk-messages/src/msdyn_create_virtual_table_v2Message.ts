import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_create_virtual_table_v2 request message
 *
 * Web API Action: msdyn_create_virtual_table_v2
 */
export class msdyn_create_virtual_table_v2Request
  extends OrganizationRequest
  implements Executable<msdyn_create_virtual_table_v2Response>
{
  constructor(
    public virtual_table_columns: Record<string, unknown>[],
    public dataset_value: string,
    public virtual_table_schema_name: string,
    public virtual_table_name: string,
    public datasource_id: string,
    public solution_id: string,
    public connectionreference_id: string,
    public datasource_name: string,
    public use_environment_variable_for_dataset: boolean,
    public primary_field_name: string,
    public virtual_table_plural_name: string,
    public virtual_table_external_name: string,
    public environment_variable_names: Record<string, unknown>[],
    public environment_id: string,
    public connection_id: string,
    public primary_key_name: string,
    public connectionreference_display_name: string,
    public connectionreference_logical_name: string
  ) {
    super("msdyn_create_virtual_table_v2");
  }

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
    return msdyn_create_virtual_table_v2Response.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
  }
}

/**
 * msdyn_create_virtual_table_v2 response message
 */
export class msdyn_create_virtual_table_v2Response extends OrganizationResponse {
  constructor(public result: msdyn_create_virtual_table_v2Response) {
    super("msdyn_create_virtual_table_v2");
  }

  static fromResponse(data: unknown): msdyn_create_virtual_table_v2Response {
    return new msdyn_create_virtual_table_v2Response((data as any).value);
  }
}
