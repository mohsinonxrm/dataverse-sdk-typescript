import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_SetPresence request message
 *
 * Web API Action: CCaaS_SetPresence
 */
export class CCaaS_SetPresenceRequest
  extends OrganizationRequest
  implements Executable<CCaaS_SetPresenceResponse>
{
  constructor(
    public apiVersion: string,
    public presenceId: string
  ) {
    super("CCaaS_SetPresence");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SetPresence`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      PresenceId: this.presenceId,
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
