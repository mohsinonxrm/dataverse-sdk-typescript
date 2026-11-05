import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_GetACIMarsConnectorStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetACIMarsConnectorStatus response message
 */
export class msdyn_GetACIMarsConnectorStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetACIMarsConnectorStatusResponse) {
    super("msdyn_GetACIMarsConnectorStatus");
  }

  static fromResponse(data: unknown): msdyn_GetACIMarsConnectorStatusResponse {
    return new msdyn_GetACIMarsConnectorStatusResponse((data as any).value);
  }
}
