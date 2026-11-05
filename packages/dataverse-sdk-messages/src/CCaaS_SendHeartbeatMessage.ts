import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CCaaS_SendHeartbeatResponse as CCaaS_SendHeartbeatResponseData } from "./types/index.js";

/**
 * CCaaS_SendHeartbeat request message
 *
 * Web API Action: CCaaS_SendHeartbeat
 */
export class CCaaS_SendHeartbeatRequest
  extends OrganizationRequest
  implements Executable<CCaaS_SendHeartbeatResponse>
{
  constructor(
    public apiVersion: string,
    public clientSessionId: string
  ) {
    super("CCaaS_SendHeartbeat");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendHeartbeat`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      ClientSessionId: this.clientSessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_SendHeartbeatResponse> {
    const data = await response.json();
    return CCaaS_SendHeartbeatResponse.fromResponse(data);
  }
}

/**
 * CCaaS_SendHeartbeat response message
 */
export class CCaaS_SendHeartbeatResponse extends OrganizationResponse {
  constructor(public result: CCaaS_SendHeartbeatResponseData) {
    super("CCaaS_SendHeartbeat");
  }

  static fromResponse(data: unknown): CCaaS_SendHeartbeatResponse {
    return new CCaaS_SendHeartbeatResponse(responseObject<CCaaS_SendHeartbeatResponseData>(data));
  }
}
