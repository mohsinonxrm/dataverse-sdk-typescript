import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_get_required_fields action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_get_required_fieldsResponse {
  "@odata.context"?: string;
  eligible_primary_fields: string[];
  eligible_primary_keys: string[];
  table_display_name: string;
  table_id: string;
  table_plural_name: string;
  table_primary_field: string;
  table_primary_key: string;
  table_schema_name: string;
}

/**
 * Parameters of the msdyn_get_required_fields action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_get_required_fieldsActionParameters {
  connection_id: string;
  connector_id: string;
  table_id: string;
  dataset_value: string;
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
      connection_id: this.parameters.connection_id,
      connector_id: this.parameters.connector_id,
      table_id: this.parameters.table_id,
      dataset_value: this.parameters.dataset_value,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_get_required_fieldsResponse;
  }
}
