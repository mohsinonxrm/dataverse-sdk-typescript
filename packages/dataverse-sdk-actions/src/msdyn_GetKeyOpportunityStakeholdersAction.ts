import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetKeyOpportunityStakeholders action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetKeyOpportunityStakeholdersResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetKeyOpportunityStakeholdersResponse;
  }
}
