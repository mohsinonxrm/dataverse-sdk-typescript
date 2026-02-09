import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SaveOpportunityResearchAgentContentCustomAction request message
 *
 * Web API Action: msdyn_SaveOpportunityResearchAgentContentCustomAction
 */
export class msdyn_SaveOpportunityResearchAgentContentCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveOpportunityResearchAgentContentCustomActionResponse>
{
  constructor(public agentContent: string) {
    super("msdyn_SaveOpportunityResearchAgentContentCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveOpportunityResearchAgentContentCustomAction`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SaveOpportunityResearchAgentContentCustomActionResponse> {
    const data = await response.json();
    return msdyn_SaveOpportunityResearchAgentContentCustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AgentContent: this.agentContent,
    };
  }
}

/**
 * msdyn_SaveOpportunityResearchAgentContentCustomAction response message
 */
export class msdyn_SaveOpportunityResearchAgentContentCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveOpportunityResearchAgentContentCustomActionResponse) {
    super("msdyn_SaveOpportunityResearchAgentContentCustomAction");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SaveOpportunityResearchAgentContentCustomActionResponse {
    return new msdyn_SaveOpportunityResearchAgentContentCustomActionResponse((data as any).value);
  }
}
