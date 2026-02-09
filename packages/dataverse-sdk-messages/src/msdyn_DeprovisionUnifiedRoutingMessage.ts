import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DeprovisionUnifiedRoutingResponse> {
    const data = await response.json();
    return msdyn_DeprovisionUnifiedRoutingResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_DeprovisionUnifiedRouting response message
 */
export class msdyn_DeprovisionUnifiedRoutingResponse extends OrganizationResponse {
  constructor(public result: msdyn_DeprovisionUnifiedRoutingResponse) {
    super("msdyn_DeprovisionUnifiedRouting");
  }

  static fromResponse(data: unknown): msdyn_DeprovisionUnifiedRoutingResponse {
    return new msdyn_DeprovisionUnifiedRoutingResponse((data as any).value);
  }
}
