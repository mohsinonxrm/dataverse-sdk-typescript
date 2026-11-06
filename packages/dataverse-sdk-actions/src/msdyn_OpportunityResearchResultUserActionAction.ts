import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_OpportunityResearchResultUserAction action
 */
export interface msdyn_OpportunityResearchResultUserActionResponse {
  Timestamp: string;
  Success: boolean;
}

/**
 * Parameters of the msdyn_OpportunityResearchResultUserAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OpportunityResearchResultUserActionActionParameters {
  Id: string;
  Action: string;
  Topic: string;
  MacroAgentOrchestrationId: string;
  OpportunityId: string;
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
      Action: this.parameters.Action,
      Topic: this.parameters.Topic,
      MacroAgentOrchestrationId: this.parameters.MacroAgentOrchestrationId,
      OpportunityId: this.parameters.OpportunityId,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_OpportunityResearchResultUserActionResponse;
  }
}
