import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_get_required_fieldsResponse as msdyn_get_required_fieldsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_get_required_fieldsResponse.fromResponse({});
    return msdyn_get_required_fieldsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_get_required_fields response message
 */
export class msdyn_get_required_fieldsResponse extends OrganizationResponse {
  constructor(public result: msdyn_get_required_fieldsResponseData) {
    super("msdyn_get_required_fields");
  }

  static fromResponse(data: unknown): msdyn_get_required_fieldsResponse {
    return new msdyn_get_required_fieldsResponse(
      responseObject<msdyn_get_required_fieldsResponseData>(data)
    );
  }
}
