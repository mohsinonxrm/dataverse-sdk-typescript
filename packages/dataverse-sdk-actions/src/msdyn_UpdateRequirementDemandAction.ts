import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateRequirementDemand action
 */
export interface msdyn_UpdateRequirementDemandResponse {
  PersistedRequirementDemandContext: string;
}

/**
 * msdyn_UpdateRequirementDemand action
 *
 * Unbound action
 */
export class msdyn_UpdateRequirementDemandAction implements Executable<msdyn_UpdateRequirementDemandResponse> {
  constructor(public readonly requirementDemandContext: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRequirementDemand`;

    const body: Record<string, unknown> = {
      RequirementDemandContext: this.requirementDemandContext,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateRequirementDemandResponse> {
    const data = await response.json();
    return data as msdyn_UpdateRequirementDemandResponse;
  }
}
