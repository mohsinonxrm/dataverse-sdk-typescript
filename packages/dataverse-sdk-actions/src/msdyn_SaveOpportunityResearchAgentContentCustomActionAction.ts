import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SaveOpportunityResearchAgentContentCustomAction action
 */
export interface msdyn_SaveOpportunityResearchAgentContentCustomActionResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
  Response: string;
  StatusCode: number;
}

/**
 * Parameters of the msdyn_SaveOpportunityResearchAgentContentCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveOpportunityResearchAgentContentCustomActionActionParameters {
  AgentContent?: string;
}

/**
 * msdyn_SaveOpportunityResearchAgentContentCustomAction action
 *
 * Unbound action
 */
export class msdyn_SaveOpportunityResearchAgentContentCustomActionAction implements Executable<msdyn_SaveOpportunityResearchAgentContentCustomActionResponse> {
  constructor(
    public readonly parameters: msdyn_SaveOpportunityResearchAgentContentCustomActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveOpportunityResearchAgentContentCustomAction`;

    const body = requestBody({
      AgentContent: this.parameters.AgentContent,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SaveOpportunityResearchAgentContentCustomActionResponse;
    return (await response.json()) as msdyn_SaveOpportunityResearchAgentContentCustomActionResponse;
  }
}
