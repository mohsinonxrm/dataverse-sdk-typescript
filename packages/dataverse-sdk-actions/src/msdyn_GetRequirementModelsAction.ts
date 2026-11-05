import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetRequirementModels action
 */
export interface msdyn_GetRequirementModelsResponse {
  Response: string;
}

/**
 * msdyn_GetRequirementModels action
 *
 * Unbound action
 */
export class msdyn_GetRequirementModelsAction implements Executable<msdyn_GetRequirementModelsResponse> {
  constructor(public readonly attributes: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementModels`;

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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementModelsResponse> {
    const data = await response.json();
    return data as msdyn_GetRequirementModelsResponse;
  }
}
