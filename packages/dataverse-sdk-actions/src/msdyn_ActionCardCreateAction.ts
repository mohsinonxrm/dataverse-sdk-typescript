import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ActionCardCreate action
 */
export interface msdyn_ActionCardCreateResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ActionCardCreate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActionCardCreateActionParameters {
  actionCardCreateParams: string;
}

/**
 * msdyn_ActionCardCreate action
 *
 * Unbound action
 */
export class msdyn_ActionCardCreateAction implements Executable<msdyn_ActionCardCreateResponse> {
  constructor(public readonly parameters: msdyn_ActionCardCreateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActionCardCreate`;

    const body = requestBody({
      actionCardCreateParams: this.parameters.actionCardCreateParams,
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

  async parseResponse(response: Response): Promise<msdyn_ActionCardCreateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ActionCardCreateResponse;
    return (await response.json()) as msdyn_ActionCardCreateResponse;
  }
}
