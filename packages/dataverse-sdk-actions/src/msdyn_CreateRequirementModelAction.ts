import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateRequirementModel action
 */
export interface msdyn_CreateRequirementModelResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateRequirementModelResponse;
    return (await response.json()) as msdyn_CreateRequirementModelResponse;
  }
}
