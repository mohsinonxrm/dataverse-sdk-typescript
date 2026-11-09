import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_create_virtual_table_v2 action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_create_virtual_table_v2Response {
  "@odata.context"?: string;
  virtual_table_id: string;
}

/**
 * Parameters of the msdyn_create_virtual_table_v2 action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_create_virtual_table_v2ActionParameters {
  environment_variable_names?: Record<string, unknown>[];
  connectionreference_display_name?: string;
  use_environment_variable_for_dataset?: boolean;
  virtual_table_columns?: Record<string, unknown>[];
  connectionreference_id?: string;
  virtual_table_name: string;
  primary_key_name: string;
  connection_id: string;
  virtual_table_schema_name?: string;
  solution_id?: string;
  connectionreference_logical_name?: string;
  datasource_id?: string;
  virtual_table_external_name: string;
  dataset_value: string;
  virtual_table_plural_name?: string;
  environment_id?: string;
  primary_field_name: string;
  datasource_name?: string;
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
      environment_variable_names: this.parameters.environment_variable_names,
      connectionreference_display_name: this.parameters.connectionreference_display_name,
      use_environment_variable_for_dataset: this.parameters.use_environment_variable_for_dataset,
      virtual_table_columns: this.parameters.virtual_table_columns,
      connectionreference_id: this.parameters.connectionreference_id,
      virtual_table_name: this.parameters.virtual_table_name,
      primary_key_name: this.parameters.primary_key_name,
      connection_id: this.parameters.connection_id,
      virtual_table_schema_name: this.parameters.virtual_table_schema_name,
      solution_id: this.parameters.solution_id,
      connectionreference_logical_name: this.parameters.connectionreference_logical_name,
      datasource_id: this.parameters.datasource_id,
      virtual_table_external_name: this.parameters.virtual_table_external_name,
      dataset_value: this.parameters.dataset_value,
      virtual_table_plural_name: this.parameters.virtual_table_plural_name,
      environment_id: this.parameters.environment_id,
      primary_field_name: this.parameters.primary_field_name,
      datasource_name: this.parameters.datasource_name,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_create_virtual_table_v2Response;
  }
}
