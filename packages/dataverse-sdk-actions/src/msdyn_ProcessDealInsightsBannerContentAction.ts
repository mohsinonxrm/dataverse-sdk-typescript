import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ProcessDealInsightsBannerContent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProcessDealInsightsBannerContentResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  ProcessedAgentResponse: string;
}

/**
 * Parameters of the msdyn_ProcessDealInsightsBannerContent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProcessDealInsightsBannerContentActionParameters {
  SalesAgentRunId: string;
  MacroAgentOrchestrationId: string;
  OpportunityId: string;
  RawMCSAgentResponse: string;
  AgentProfileId?: string;
}

/**
 * msdyn_ProcessDealInsightsBannerContent action
 *
 * Unbound action
 */
export class msdyn_ProcessDealInsightsBannerContentAction implements Executable<msdyn_ProcessDealInsightsBannerContentResponse> {
  constructor(public readonly parameters: msdyn_ProcessDealInsightsBannerContentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProcessDealInsightsBannerContent`;

    const body = requestBody({
      SalesAgentRunId: this.parameters.SalesAgentRunId,
      MacroAgentOrchestrationId: this.parameters.MacroAgentOrchestrationId,
      OpportunityId: this.parameters.OpportunityId,
      RawMCSAgentResponse: this.parameters.RawMCSAgentResponse,
      AgentProfileId: this.parameters.AgentProfileId,
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

  async parseResponse(response: Response): Promise<msdyn_ProcessDealInsightsBannerContentResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ProcessDealInsightsBannerContentResponse;
  }
}
