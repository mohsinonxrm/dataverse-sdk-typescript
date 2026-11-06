import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ProvisionUnifiedRoutingResponse as msdyn_ProvisionUnifiedRoutingResponseData } from "./types/index.js";

/**
 * msdyn_ProvisionUnifiedRouting request message
 *
 * Web API Action: msdyn_ProvisionUnifiedRouting
 */
export class msdyn_ProvisionUnifiedRoutingRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProvisionUnifiedRoutingResponse>
{
  constructor() {
    super("msdyn_ProvisionUnifiedRouting");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionUnifiedRouting`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ProvisionUnifiedRoutingResponse> {
    const data = await response.json();
    return msdyn_ProvisionUnifiedRoutingResponse.fromResponse(data);
  }
}

/**
 * msdyn_ProvisionUnifiedRouting response message
 */
export class msdyn_ProvisionUnifiedRoutingResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProvisionUnifiedRoutingResponseData) {
    super("msdyn_ProvisionUnifiedRouting");
  }

  static fromResponse(data: unknown): msdyn_ProvisionUnifiedRoutingResponse {
    return new msdyn_ProvisionUnifiedRoutingResponse(
      responseObject<msdyn_ProvisionUnifiedRoutingResponseData>(data)
    );
  }
}
