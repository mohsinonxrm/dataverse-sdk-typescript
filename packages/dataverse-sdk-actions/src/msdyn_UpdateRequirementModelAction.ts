import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateRequirementModel action
 */
export interface msdyn_UpdateRequirementModelResponse {
  // No content returned
}

/**
 * msdyn_UpdateRequirementModel action
 *
 * Unbound action
 */
export class msdyn_UpdateRequirementModelAction implements Executable<msdyn_UpdateRequirementModelResponse> {
  constructor(
    public readonly from: string | undefined,
    public readonly to: string | undefined,
    public readonly requirementGroupId: string | undefined,
    public readonly attributes: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRequirementModel`;

    const body: Record<string, unknown> = {
      From: this.from,
      To: this.to,
      RequirementGroupId: this.requirementGroupId,
      Attributes: this.attributes,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateRequirementModelResponse> {
    // No return value (204 No Content)
    return {};
  }
}
