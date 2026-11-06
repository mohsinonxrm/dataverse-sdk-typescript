import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetRequirementModels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRequirementModelsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetRequirementModelsResponse;
  }
}
