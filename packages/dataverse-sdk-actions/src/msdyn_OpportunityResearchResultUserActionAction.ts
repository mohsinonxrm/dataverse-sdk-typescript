import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_OpportunityResearchResultUserAction action
 */
export interface msdyn_OpportunityResearchResultUserActionResponse {
  Success: boolean;
  Timestamp: string;
}

/**
 * Parameters of the msdyn_OpportunityResearchResultUserAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OpportunityResearchResultUserActionActionParameters {
  Id: string;
  MacroAgentOrchestrationId: string;
  Action: string;
  Topic: string;
  OpportunityId: string;
  IsCallFromNba?: boolean;
}

/**
 * msdyn_OpportunityResearchResultUserAction action
 *
 * Unbound action
 */
export class msdyn_OpportunityResearchResultUserActionAction implements Executable<msdyn_OpportunityResearchResultUserActionResponse> {
  constructor(
    public readonly parameters: msdyn_OpportunityResearchResultUserActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OpportunityResearchResultUserAction`;

    const body = requestBody({
      Id: this.parameters.Id,
      MacroAgentOrchestrationId: this.parameters.MacroAgentOrchestrationId,
      Action: this.parameters.Action,
      Topic: this.parameters.Topic,
      OpportunityId: this.parameters.OpportunityId,
      IsCallFromNba: this.parameters.IsCallFromNba,
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
  ): Promise<msdyn_OpportunityResearchResultUserActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OpportunityResearchResultUserActionResponse;
    return (await response.json()) as msdyn_OpportunityResearchResultUserActionResponse;
  }
}
