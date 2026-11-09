import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_create_virtual_table_v2 message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_create_virtual_table_v2RequestParameters {
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
 * msdyn_create_virtual_table_v2 request message
 *
 * Web API Action: msdyn_create_virtual_table_v2
 */
export class msdyn_create_virtual_table_v2Request
  extends OrganizationRequest
  implements Executable<msdyn_create_virtual_table_v2Response>
{
  declare readonly Parameters: Readonly<msdyn_create_virtual_table_v2RequestParameters>;

  constructor(parameters: msdyn_create_virtual_table_v2RequestParameters) {
    super("msdyn_create_virtual_table_v2", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_create_virtual_table_v2`;

    const body = requestBody({
      environment_variable_names: this.Parameters.environment_variable_names,
      connectionreference_display_name: this.Parameters.connectionreference_display_name,
      use_environment_variable_for_dataset: this.Parameters.use_environment_variable_for_dataset,
      virtual_table_columns: this.Parameters.virtual_table_columns,
      connectionreference_id: this.Parameters.connectionreference_id,
      virtual_table_name: this.Parameters.virtual_table_name,
      primary_key_name: this.Parameters.primary_key_name,
      connection_id: this.Parameters.connection_id,
      virtual_table_schema_name: this.Parameters.virtual_table_schema_name,
      solution_id: this.Parameters.solution_id,
      connectionreference_logical_name: this.Parameters.connectionreference_logical_name,
      datasource_id: this.Parameters.datasource_id,
      virtual_table_external_name: this.Parameters.virtual_table_external_name,
      dataset_value: this.Parameters.dataset_value,
      virtual_table_plural_name: this.Parameters.virtual_table_plural_name,
      environment_id: this.Parameters.environment_id,
      primary_field_name: this.Parameters.primary_field_name,
      datasource_name: this.Parameters.datasource_name,
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
    return msdyn_create_virtual_table_v2Response.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_create_virtual_table_v2 action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_create_virtual_table_v2Result {
  "@odata.context"?: string;
  virtual_table_id: string;
}

/**
 * msdyn_create_virtual_table_v2 response message
 *
 * `result` is the value the msdyn_create_virtual_table_v2 action returns (see {@link msdyn_create_virtual_table_v2Result}).
 */
export class msdyn_create_virtual_table_v2Response extends OrganizationResponse {
  constructor(public result: msdyn_create_virtual_table_v2Result) {
    super("msdyn_create_virtual_table_v2");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_create_virtual_table_v2Response {
    return new msdyn_create_virtual_table_v2Response(data as msdyn_create_virtual_table_v2Result);
  }
}
