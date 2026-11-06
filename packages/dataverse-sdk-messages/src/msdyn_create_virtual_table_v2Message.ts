import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_create_virtual_table_v2Response as msdyn_create_virtual_table_v2ResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_create_virtual_table_v2 message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_create_virtual_table_v2RequestParameters {
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
      virtual_table_columns: this.Parameters.virtual_table_columns,
      dataset_value: this.Parameters.dataset_value,
      virtual_table_schema_name: this.Parameters.virtual_table_schema_name,
      virtual_table_name: this.Parameters.virtual_table_name,
      datasource_id: this.Parameters.datasource_id,
      solution_id: this.Parameters.solution_id,
      connectionreference_id: this.Parameters.connectionreference_id,
      datasource_name: this.Parameters.datasource_name,
      use_environment_variable_for_dataset: this.Parameters.use_environment_variable_for_dataset,
      primary_field_name: this.Parameters.primary_field_name,
      virtual_table_plural_name: this.Parameters.virtual_table_plural_name,
      virtual_table_external_name: this.Parameters.virtual_table_external_name,
      environment_variable_names: this.Parameters.environment_variable_names,
      environment_id: this.Parameters.environment_id,
      connection_id: this.Parameters.connection_id,
      primary_key_name: this.Parameters.primary_key_name,
      connectionreference_display_name: this.Parameters.connectionreference_display_name,
      connectionreference_logical_name: this.Parameters.connectionreference_logical_name,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_create_virtual_table_v2Response.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_create_virtual_table_v2 response message
 */
export class msdyn_create_virtual_table_v2Response extends OrganizationResponse {
  constructor(public result: msdyn_create_virtual_table_v2ResponseData) {
    super("msdyn_create_virtual_table_v2");
  }

  static fromResponse(data: unknown): msdyn_create_virtual_table_v2Response {
    return new msdyn_create_virtual_table_v2Response(
      responseObject<msdyn_create_virtual_table_v2ResponseData>(data)
    );
  }
}
