import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SaveAgentContentCustomAction request message
 *
 * Web API Action: msdyn_SaveAgentContentCustomAction
 */
export class msdyn_SaveAgentContentCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveAgentContentCustomActionResponse>
{
  constructor(public agentContent: string) {
    super("msdyn_SaveAgentContentCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveAgentContentCustomAction`;

    const body: Record<string, unknown> = {
      AgentContent: this.agentContent,
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

  async parseResponse(response: Response): Promise<msdyn_SaveAgentContentCustomActionResponse> {
    const data = await response.json();
    return msdyn_SaveAgentContentCustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AgentContent: this.agentContent,
    };
  }
}

/**
 * msdyn_SaveAgentContentCustomAction response message
 */
export class msdyn_SaveAgentContentCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveAgentContentCustomActionResponse) {
    super("msdyn_SaveAgentContentCustomAction");
  }

  static fromResponse(data: unknown): msdyn_SaveAgentContentCustomActionResponse {
    return new msdyn_SaveAgentContentCustomActionResponse((data as any).value);
  }
}
