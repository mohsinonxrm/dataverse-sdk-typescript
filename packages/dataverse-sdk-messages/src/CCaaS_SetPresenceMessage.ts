import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_SetPresence message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SetPresenceRequestParameters {
  PresenceId: string;
  ApiVersion: string;
}

/**
 * CCaaS_SetPresence request message
 *
 * Web API Action: CCaaS_SetPresence
 */
export class CCaaS_SetPresenceRequest
  extends OrganizationRequest
  implements Executable<CCaaS_SetPresenceResponse>
{
  declare readonly Parameters: Readonly<CCaaS_SetPresenceRequestParameters>;

  constructor(parameters: CCaaS_SetPresenceRequestParameters) {
    super("CCaaS_SetPresence", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SetPresence`;

    const body = requestBody({
      PresenceId: this.Parameters.PresenceId,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_SetPresenceResponse> {
    // No return value (204 No Content)
    return new CCaaS_SetPresenceResponse();
  }
}

/**
 * CCaaS_SetPresence response message
 */
export class CCaaS_SetPresenceResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_SetPresence");
  }

  static fromResponse(_data: unknown): CCaaS_SetPresenceResponse {
    return new CCaaS_SetPresenceResponse();
  }
}
