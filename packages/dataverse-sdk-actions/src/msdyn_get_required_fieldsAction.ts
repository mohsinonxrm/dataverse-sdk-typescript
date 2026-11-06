import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_get_required_fields action
 */
export interface msdyn_get_required_fieldsResponse {
  table_primary_key: string;
  table_primary_field: string;
  table_id: string;
  table_plural_name: string;
  eligible_primary_keys: string[];
  eligible_primary_fields: string[];
  table_display_name: string;
  table_schema_name: string;
}

/**
 * Parameters of the msdyn_get_required_fields action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_get_required_fieldsActionParameters {
  table_id: string;
  dataset_value: string;
  connection_id: string;
  connector_id: string;
}

/**
 * msdyn_get_required_fields action
 *
 * Unbound action
 */
export class msdyn_get_required_fieldsAction implements Executable<msdyn_get_required_fieldsResponse> {
  constructor(public readonly parameters: msdyn_get_required_fieldsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_get_required_fields`;

    const body = requestBody({
      table_id: this.parameters.table_id,
      dataset_value: this.parameters.dataset_value,
      connection_id: this.parameters.connection_id,
      connector_id: this.parameters.connector_id,
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

  async parseResponse(response: Response): Promise<msdyn_get_required_fieldsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_get_required_fieldsResponse;
  }
}
