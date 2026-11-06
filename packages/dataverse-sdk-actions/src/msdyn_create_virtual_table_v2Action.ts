import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_create_virtual_table_v2 action
 */
export interface msdyn_create_virtual_table_v2Response {
  virtual_table_id: string;
}

/**
 * Parameters of the msdyn_create_virtual_table_v2 action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_create_virtual_table_v2ActionParameters {
  virtual_table_columns?: Record<string, unknown>[];
  dataset_value: string;
  virtual_table_schema_name?: string;
  virtual_table_name: string;
  datasource_id?: string;
  solution_id?: string;
  connectionreference_id?: string;
  datasource_name?: string;
  use_environment_variable_for_dataset?: boolean;
  primary_field_name: string;
  virtual_table_plural_name?: string;
  virtual_table_external_name: string;
  environment_variable_names?: Record<string, unknown>[];
  environment_id?: string;
  connection_id: string;
  primary_key_name: string;
  connectionreference_display_name?: string;
  connectionreference_logical_name?: string;
}

/**
 * msdyn_create_virtual_table_v2 action
 *
 * Unbound action
 */
export class msdyn_create_virtual_table_v2Action implements Executable<msdyn_create_virtual_table_v2Response> {
  constructor(public readonly parameters: msdyn_create_virtual_table_v2ActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_create_virtual_table_v2`;

    const body = requestBody({
      virtual_table_columns: this.parameters.virtual_table_columns,
      dataset_value: this.parameters.dataset_value,
      virtual_table_schema_name: this.parameters.virtual_table_schema_name,
      virtual_table_name: this.parameters.virtual_table_name,
      datasource_id: this.parameters.datasource_id,
      solution_id: this.parameters.solution_id,
      connectionreference_id: this.parameters.connectionreference_id,
      datasource_name: this.parameters.datasource_name,
      use_environment_variable_for_dataset: this.parameters.use_environment_variable_for_dataset,
      primary_field_name: this.parameters.primary_field_name,
      virtual_table_plural_name: this.parameters.virtual_table_plural_name,
      virtual_table_external_name: this.parameters.virtual_table_external_name,
      environment_variable_names: this.parameters.environment_variable_names,
      environment_id: this.parameters.environment_id,
      connection_id: this.parameters.connection_id,
      primary_key_name: this.parameters.primary_key_name,
      connectionreference_display_name: this.parameters.connectionreference_display_name,
      connectionreference_logical_name: this.parameters.connectionreference_logical_name,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_create_virtual_table_v2Response;
    return (await response.json()) as msdyn_create_virtual_table_v2Response;
  }
}
