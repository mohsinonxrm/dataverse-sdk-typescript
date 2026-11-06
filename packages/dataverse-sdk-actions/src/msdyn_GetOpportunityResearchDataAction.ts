import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetOpportunityResearchData action
 */
export interface msdyn_GetOpportunityResearchDataResponse {
  Citations: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  ResponseJson: string;
  Status: string;
  StatusDetails: string;
}

/**
 * Parameters of the msdyn_GetOpportunityResearchData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityResearchDataActionParameters {
  RequestedFields: string;
  AdditionalContext?: string;
  OpportunityId: string;
  IncludeStatusMetadata?: boolean;
  MacroAgentOrchestrationId: string;
  SalesAgentRunId?: string;
}

/**
 * msdyn_GetOpportunityResearchData action
 *
 * Unbound action
 */
export class msdyn_GetOpportunityResearchDataAction implements Executable<msdyn_GetOpportunityResearchDataResponse> {
  constructor(public readonly parameters: msdyn_GetOpportunityResearchDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityResearchData`;

    const body = requestBody({
      RequestedFields: this.parameters.RequestedFields,
      AdditionalContext: this.parameters.AdditionalContext,
      OpportunityId: this.parameters.OpportunityId,
      IncludeStatusMetadata: this.parameters.IncludeStatusMetadata,
      MacroAgentOrchestrationId: this.parameters.MacroAgentOrchestrationId,
      SalesAgentRunId: this.parameters.SalesAgentRunId,
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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityResearchDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetOpportunityResearchDataResponse;
    return (await response.json()) as msdyn_GetOpportunityResearchDataResponse;
  }
}
