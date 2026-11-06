import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckIfWorkOrderGeneratedFromABS action
 */
export interface msdyn_CheckIfWorkOrderGeneratedFromABSResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckIfWorkOrderGeneratedFromABS action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfWorkOrderGeneratedFromABSActionParameters {
  TimeInterval: string;
}

/**
 * msdyn_CheckIfWorkOrderGeneratedFromABS action
 *
 * Unbound action
 */
export class msdyn_CheckIfWorkOrderGeneratedFromABSAction implements Executable<msdyn_CheckIfWorkOrderGeneratedFromABSResponse> {
  constructor(public readonly parameters: msdyn_CheckIfWorkOrderGeneratedFromABSActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfWorkOrderGeneratedFromABS`;

    const body = requestBody({
      TimeInterval: this.parameters.TimeInterval,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfWorkOrderGeneratedFromABSResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIfWorkOrderGeneratedFromABSResponse;
  }
}
