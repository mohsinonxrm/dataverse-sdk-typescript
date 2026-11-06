import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SaveOpportunityResearchAgentContentCustomActionResponse as msdyn_SaveOpportunityResearchAgentContentCustomActionResponseData } from "./types/index.js";

/**
 * msdyn_SaveOpportunityResearchAgentContentCustomAction request message
 *
 * Web API Action: msdyn_SaveOpportunityResearchAgentContentCustomAction
 */
export class msdyn_SaveOpportunityResearchAgentContentCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveOpportunityResearchAgentContentCustomActionResponse>
{
  constructor(public agentContent?: string) {
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
        "content-type": "application/json",
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
}

/**
 * msdyn_SaveOpportunityResearchAgentContentCustomAction response message
 */
export class msdyn_SaveOpportunityResearchAgentContentCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveOpportunityResearchAgentContentCustomActionResponseData) {
    super("msdyn_SaveOpportunityResearchAgentContentCustomAction");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SaveOpportunityResearchAgentContentCustomActionResponse {
    return new msdyn_SaveOpportunityResearchAgentContentCustomActionResponse(
      responseObject<msdyn_SaveOpportunityResearchAgentContentCustomActionResponseData>(data)
    );
  }
}
