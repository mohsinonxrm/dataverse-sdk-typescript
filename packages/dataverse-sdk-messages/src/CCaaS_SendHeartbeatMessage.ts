import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_SendHeartbeatResponse> {
    const data = await response.json();
    return CCaaS_SendHeartbeatResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ApiVersion: this.apiVersion,
      ClientSessionId: this.clientSessionId,
    };
  }
}

/**
 * CCaaS_SendHeartbeat response message
 */
export class CCaaS_SendHeartbeatResponse extends OrganizationResponse {
  constructor(public result: CCaaS_SendHeartbeatResponse) {
    super("CCaaS_SendHeartbeat");
  }

  static fromResponse(data: unknown): CCaaS_SendHeartbeatResponse {
    return new CCaaS_SendHeartbeatResponse((data as any).value);
  }
}
