import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_InitializeSessionChannel request message
 *
 * Web API Action: msdyn_InitializeSessionChannel
 */
export class msdyn_InitializeSessionChannelRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitializeSessionChannelResponse>
{
  constructor() {
    super("msdyn_InitializeSessionChannel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitializeSessionChannel`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_InitializeSessionChannelResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_InitializeSessionChannelResponse());
  }
}

/**
 * msdyn_InitializeSessionChannel response message
 */
export class msdyn_InitializeSessionChannelResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_InitializeSessionChannel");
  }

  static fromResponse(_data?: unknown): msdyn_InitializeSessionChannelResponse {
    return new msdyn_InitializeSessionChannelResponse();
  }
}
