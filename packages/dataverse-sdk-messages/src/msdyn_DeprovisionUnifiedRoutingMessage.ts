import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_DeprovisionUnifiedRoutingResponse as msdyn_DeprovisionUnifiedRoutingResponseData } from "./types/index.js";

/**
 * msdyn_DeprovisionUnifiedRouting request message
 *
 * Web API Action: msdyn_DeprovisionUnifiedRouting
 */
export class msdyn_DeprovisionUnifiedRoutingRequest
  extends OrganizationRequest
  implements Executable<msdyn_DeprovisionUnifiedRoutingResponse>
{
  constructor() {
    super("msdyn_DeprovisionUnifiedRouting");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DeprovisionUnifiedRouting`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DeprovisionUnifiedRoutingResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_DeprovisionUnifiedRoutingResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_DeprovisionUnifiedRouting response message
 */
export class msdyn_DeprovisionUnifiedRoutingResponse extends OrganizationResponse {
  constructor(public result: msdyn_DeprovisionUnifiedRoutingResponseData) {
    super("msdyn_DeprovisionUnifiedRouting");
  }

  static fromResponse(data: unknown): msdyn_DeprovisionUnifiedRoutingResponse {
    return new msdyn_DeprovisionUnifiedRoutingResponse(
      responseObject<msdyn_DeprovisionUnifiedRoutingResponseData>(data)
    );
  }
}
