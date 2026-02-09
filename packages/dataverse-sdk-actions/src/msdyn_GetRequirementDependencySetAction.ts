import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetRequirementDependencySet action
 */
export interface msdyn_GetRequirementDependencySetResponse {
  RequirementDependencySet: string;
}

/**
 * msdyn_GetRequirementDependencySet action
 *
 * Unbound action
 */
export class msdyn_GetRequirementDependencySetAction implements Executable<msdyn_GetRequirementDependencySetResponse> {
  constructor(
    public readonly version: string,
    public readonly requirementIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDependencySet`;

    const body: Record<string, unknown> = {
      Version: this.version,
      RequirementIds: this.requirementIds,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDependencySetResponse> {
    const data = await response.json();
    return data as msdyn_GetRequirementDependencySetResponse;
  }
}
