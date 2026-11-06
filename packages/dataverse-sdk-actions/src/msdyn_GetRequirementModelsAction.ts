import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetRequirementModels action
 */
export interface msdyn_GetRequirementModelsResponse {
  Response: string;
}

/**
 * Parameters of the msdyn_GetRequirementModels action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementModelsActionParameters {
  Attributes: string;
}

/**
 * msdyn_GetRequirementModels action
 *
 * Unbound action
 */
export class msdyn_GetRequirementModelsAction implements Executable<msdyn_GetRequirementModelsResponse> {
  constructor(public readonly parameters: msdyn_GetRequirementModelsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementModels`;

    const body = requestBody({
      Attributes: this.parameters.Attributes,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementModelsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetRequirementModelsResponse;
  }
}
