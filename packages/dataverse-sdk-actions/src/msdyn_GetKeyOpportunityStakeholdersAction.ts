import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetKeyOpportunityStakeholders action
 */
export interface msdyn_GetKeyOpportunityStakeholdersResponse {
  ErrorMessage: string;
  IsSuccess: boolean;
  Result: string;
}

/**
 * Parameters of the msdyn_GetKeyOpportunityStakeholders action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKeyOpportunityStakeholdersActionParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetKeyOpportunityStakeholders action
 *
 * Unbound action
 */
export class msdyn_GetKeyOpportunityStakeholdersAction implements Executable<msdyn_GetKeyOpportunityStakeholdersResponse> {
  constructor(public readonly parameters: msdyn_GetKeyOpportunityStakeholdersActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeyOpportunityStakeholders`;

    const body = requestBody({
      msdyn_OpportunityId: this.parameters.msdyn_OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetKeyOpportunityStakeholdersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetKeyOpportunityStakeholdersResponse;
    return (await response.json()) as msdyn_GetKeyOpportunityStakeholdersResponse;
  }
}
