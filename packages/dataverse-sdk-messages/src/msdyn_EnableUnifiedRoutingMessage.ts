import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_EnableUnifiedRouting message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EnableUnifiedRoutingRequestParameters {
  Enable: boolean;
}

/**
 * msdyn_EnableUnifiedRouting request message
 *
 * Web API Action: msdyn_EnableUnifiedRouting
 */
export class msdyn_EnableUnifiedRoutingRequest
  extends OrganizationRequest
  implements Executable<msdyn_EnableUnifiedRoutingResponse>
{
  declare readonly Parameters: Readonly<msdyn_EnableUnifiedRoutingRequestParameters>;

  constructor(parameters: msdyn_EnableUnifiedRoutingRequestParameters) {
    super("msdyn_EnableUnifiedRouting", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableUnifiedRouting`;

    const body = requestBody({
      Enable: this.Parameters.Enable,
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

  async parseResponse(response: Response): Promise<msdyn_EnableUnifiedRoutingResponse> {
    // No return value (204 No Content)
    return new msdyn_EnableUnifiedRoutingResponse();
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
