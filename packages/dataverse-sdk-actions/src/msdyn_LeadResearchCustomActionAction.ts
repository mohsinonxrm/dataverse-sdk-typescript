import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_LeadResearchCustomAction action
 */
export interface msdyn_LeadResearchCustomActionResponse {
  ResearchResponse: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
}

/**
 * Parameters of the msdyn_LeadResearchCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LeadResearchCustomActionActionParameters {
  ResearchRequest?: string;
}

/**
 * msdyn_LeadResearchCustomAction action
 *
 * Unbound action
 */
export class msdyn_LeadResearchCustomActionAction implements Executable<msdyn_LeadResearchCustomActionResponse> {
  constructor(public readonly parameters: msdyn_LeadResearchCustomActionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LeadResearchCustomAction`;

    const body = requestBody({
      ResearchRequest: this.parameters.ResearchRequest,
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

  async parseResponse(response: Response): Promise<msdyn_LeadResearchCustomActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_LeadResearchCustomActionResponse;
    return (await response.json()) as msdyn_LeadResearchCustomActionResponse;
  }
}
