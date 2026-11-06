import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CreateRequirementModel action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateRequirementModelResponse {
  "@odata.context"?: string;
  Response: string;
}

/**
 * Parameters of the msdyn_CreateRequirementModel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateRequirementModelActionParameters {
  Attributes: string;
  From?: string;
  To?: string;
}

/**
 * msdyn_CreateRequirementModel action
 *
 * Unbound action
 */
export class msdyn_CreateRequirementModelAction implements Executable<msdyn_CreateRequirementModelResponse> {
  constructor(public readonly parameters: msdyn_CreateRequirementModelActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRequirementModel`;

    const body = requestBody({
      Attributes: this.parameters.Attributes,
      From: this.parameters.From,
      To: this.parameters.To,
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

  async parseResponse(response: Response): Promise<msdyn_CreateRequirementModelResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CreateRequirementModelResponse;
  }
}
