import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OpportunityResearchResultUserAction action
 */
export interface msdyn_OpportunityResearchResultUserActionResponse {
  Timestamp: string;
  Success: boolean;
}

/**
 * msdyn_OpportunityResearchResultUserAction action
 *
 * Unbound action
 */
export class msdyn_OpportunityResearchResultUserActionAction implements Executable<msdyn_OpportunityResearchResultUserActionResponse> {
  constructor(
    public readonly id: string,
    public readonly action: string,
    public readonly topic: string,
    public readonly macroAgentOrchestrationId: string,
    public readonly opportunityId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OpportunityResearchResultUserAction`;

    const body: Record<string, unknown> = {
      Id: this.id,
      Action: this.action,
      Topic: this.topic,
      MacroAgentOrchestrationId: this.macroAgentOrchestrationId,
      OpportunityId: this.opportunityId,
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
  ): Promise<msdyn_OpportunityResearchResultUserActionResponse> {
    const data = await response.json();
    return data as msdyn_OpportunityResearchResultUserActionResponse;
  }
}
