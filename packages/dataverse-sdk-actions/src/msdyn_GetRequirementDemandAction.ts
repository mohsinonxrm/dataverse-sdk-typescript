import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetRequirementDemand action
 */
export interface msdyn_GetRequirementDemandResponse {
  RequirementsToDemandMap: string;
}

/**
 * msdyn_GetRequirementDemand action
 *
 * Unbound action
 */
export class msdyn_GetRequirementDemandAction implements Executable<msdyn_GetRequirementDemandResponse> {
  constructor(public readonly requirementIds: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDemand`;

    const body: Record<string, unknown> = {
      RequirementIds: this.requirementIds,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDemandResponse> {
    const data = await response.json();
    return data as msdyn_GetRequirementDemandResponse;
  }
}
