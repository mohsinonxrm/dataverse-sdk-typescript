import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_EndSession request message
 *
 * Web API Action: CCaaS_EndSession
 */
export class CCaaS_EndSessionRequest
  extends OrganizationRequest
  implements Executable<CCaaS_EndSessionResponse>
{
  constructor(
    public msdyn_ocliveworkitemId: string,
    public apiVersion: string,
    public sessionId: string
  ) {
    super("CCaaS_EndSession");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_EndSession`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      SessionId: this.sessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_EndSessionResponse> {
    // No return value (204 No Content)
    return new CCaaS_EndSessionResponse();
  }
}

/**
 * CCaaS_EndSession response message
 */
export class CCaaS_EndSessionResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_EndSession");
  }

  static fromResponse(_data: unknown): CCaaS_EndSessionResponse {
    return new CCaaS_EndSessionResponse();
  }
}
