import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SaveOpportunityResearchAgentContentCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveOpportunityResearchAgentContentCustomActionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SaveOpportunityResearchAgentContentCustomActionResponse;
  }
}
