import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckCharacteristicHasMatchingResource action
 */
export interface msdyn_CheckCharacteristicHasMatchingResourceResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_CheckCharacteristicHasMatchingResource action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckCharacteristicHasMatchingResourceActionParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckCharacteristicHasMatchingResource action
 *
 * Unbound action
 */
export class msdyn_CheckCharacteristicHasMatchingResourceAction implements Executable<msdyn_CheckCharacteristicHasMatchingResourceResponse> {
  constructor(
    public readonly parameters: msdyn_CheckCharacteristicHasMatchingResourceActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckCharacteristicHasMatchingResource`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckCharacteristicHasMatchingResourceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckCharacteristicHasMatchingResourceResponse;
    return (await response.json()) as msdyn_CheckCharacteristicHasMatchingResourceResponse;
  }
}
