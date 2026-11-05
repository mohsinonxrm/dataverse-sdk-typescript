import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SaveOpportunityResearchAgentContentCustomAction action
 */
export interface msdyn_SaveOpportunityResearchAgentContentCustomActionResponse {
  Response: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
}

/**
 * msdyn_SaveOpportunityResearchAgentContentCustomAction action
 *
 * Unbound action
 */
export class msdyn_SaveOpportunityResearchAgentContentCustomActionAction implements Executable<msdyn_SaveOpportunityResearchAgentContentCustomActionResponse> {
  constructor(public readonly agentContent: string) {}

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
    return data as msdyn_SaveOpportunityResearchAgentContentCustomActionResponse;
  }
}
