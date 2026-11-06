import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_get_required_fieldsResponse as msdyn_get_required_fieldsResponseData } from "./types/index.js";

/**
 * msdyn_get_required_fields request message
 *
 * Web API Action: msdyn_get_required_fields
 */
export class msdyn_get_required_fieldsRequest
  extends OrganizationRequest
  implements Executable<msdyn_get_required_fieldsResponse>
{
  constructor(
    public table_id: string,
    public dataset_value: string,
    public connection_id: string,
    public connector_id: string
  ) {
    super("msdyn_get_required_fields");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_get_required_fields`;

    const body: Record<string, unknown> = {
      table_id: this.table_id,
      dataset_value: this.dataset_value,
      connection_id: this.connection_id,
      connector_id: this.connector_id,
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

  async parseResponse(response: Response): Promise<msdyn_get_required_fieldsResponse> {
    const data = await response.json();
    return msdyn_get_required_fieldsResponse.fromResponse(data);
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
