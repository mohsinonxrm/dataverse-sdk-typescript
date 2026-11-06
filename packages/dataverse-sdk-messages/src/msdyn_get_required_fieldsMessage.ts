import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_get_required_fields message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_get_required_fieldsRequestParameters {
  connection_id: string;
  connector_id: string;
  table_id: string;
  dataset_value: string;
}

/**
 * msdyn_get_required_fields request message
 *
 * Web API Action: msdyn_get_required_fields
 */
export class msdyn_get_required_fieldsRequest
  extends OrganizationRequest
  implements Executable<msdyn_get_required_fieldsResponse>
{
  declare readonly Parameters: Readonly<msdyn_get_required_fieldsRequestParameters>;

  constructor(parameters: msdyn_get_required_fieldsRequestParameters) {
    super("msdyn_get_required_fields", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_get_required_fields`;

    const body = requestBody({
      connection_id: this.Parameters.connection_id,
      connector_id: this.Parameters.connector_id,
      table_id: this.Parameters.table_id,
      dataset_value: this.Parameters.dataset_value,
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
    return msdyn_get_required_fieldsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_get_required_fields action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_get_required_fieldsResult {
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
 * msdyn_get_required_fields response message
 *
 * `result` is the value the msdyn_get_required_fields action returns (see {@link msdyn_get_required_fieldsResult}).
 */
export class msdyn_get_required_fieldsResponse extends OrganizationResponse {
  constructor(public result: msdyn_get_required_fieldsResult) {
    super("msdyn_get_required_fields");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_get_required_fieldsResponse {
    return new msdyn_get_required_fieldsResponse(data as msdyn_get_required_fieldsResult);
  }
}
