import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_ResetAgentPresence request message
 *
 * Web API Action: CCaaS_ResetAgentPresence
 */
export class CCaaS_ResetAgentPresenceRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ResetAgentPresenceResponse>
{
  constructor(public apiVersion: string) {
    super("CCaaS_ResetAgentPresence");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ResetAgentPresence`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_ResetAgentPresenceResponse> {
    const data = await response.json();
    return CCaaS_ResetAgentPresenceResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ApiVersion: this.apiVersion,
    };
  }
}

/**
 * CCaaS_ResetAgentPresence response message
 */
export class CCaaS_ResetAgentPresenceResponse extends OrganizationResponse {
  constructor(public result: CCaaS_ResetAgentPresenceResponse) {
    super("CCaaS_ResetAgentPresence");
  }

  static fromResponse(data: unknown): CCaaS_ResetAgentPresenceResponse {
    return new CCaaS_ResetAgentPresenceResponse((data as any).value);
  }
}
