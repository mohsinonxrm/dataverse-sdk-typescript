import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RemoveRequirementModel action
 */
export interface msdyn_RemoveRequirementModelResponse {
  // No content returned
}

/**
 * msdyn_RemoveRequirementModel action
 *
 * Unbound action
 */
export class msdyn_RemoveRequirementModelAction implements Executable<msdyn_RemoveRequirementModelResponse> {
  constructor(public readonly attributes: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RemoveRequirementModel`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<msdyn_RemoveRequirementModelResponse> {
    // No return value (204 No Content)
    return {};
  }
}
