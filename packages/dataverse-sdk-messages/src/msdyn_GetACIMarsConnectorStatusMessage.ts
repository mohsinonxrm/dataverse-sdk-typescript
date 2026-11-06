import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetACIMarsConnectorStatusResponse as msdyn_GetACIMarsConnectorStatusResponseData } from "./types/index.js";

/**
 * msdyn_GetACIMarsConnectorStatus request message
 *
 * Web API Action: msdyn_GetACIMarsConnectorStatus
 */
export class msdyn_GetACIMarsConnectorStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetACIMarsConnectorStatusResponse>
{
  constructor() {
    super("msdyn_GetACIMarsConnectorStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetACIMarsConnectorStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetACIMarsConnectorStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetACIMarsConnectorStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetACIMarsConnectorStatus response message
 */
export class msdyn_GetACIMarsConnectorStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetACIMarsConnectorStatusResponseData) {
    super("msdyn_GetACIMarsConnectorStatus");
  }

  static fromResponse(data: unknown): msdyn_GetACIMarsConnectorStatusResponse {
    return new msdyn_GetACIMarsConnectorStatusResponse(
      responseObject<msdyn_GetACIMarsConnectorStatusResponseData>(data)
    );
  }
}
