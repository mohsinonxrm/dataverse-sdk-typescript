import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_EnableUnifiedRouting request message
 *
 * Web API Action: msdyn_EnableUnifiedRouting
 */
export class msdyn_EnableUnifiedRoutingRequest
  extends OrganizationRequest
  implements Executable<msdyn_EnableUnifiedRoutingResponse>
{
  constructor(public enable: boolean) {
    super("msdyn_EnableUnifiedRouting");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableUnifiedRouting`;

    const body: Record<string, unknown> = {
      Enable: this.enable,
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

  async parseResponse(response: Response): Promise<msdyn_EnableUnifiedRoutingResponse> {
    // No return value (204 No Content)
    return new msdyn_EnableUnifiedRoutingResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Enable: this.enable,
    };
  }
}

/**
 * msdyn_EnableUnifiedRouting response message
 */
export class msdyn_EnableUnifiedRoutingResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_EnableUnifiedRouting");
  }

  static fromResponse(_data: unknown): msdyn_EnableUnifiedRoutingResponse {
    return new msdyn_EnableUnifiedRoutingResponse();
  }
}
