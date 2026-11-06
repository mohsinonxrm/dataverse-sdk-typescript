import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetFCBValue action
 */
export interface msdyn_GetFCBValueResponse {
  FCBValue: boolean;
}

/**
 * Parameters of the msdyn_GetFCBValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFCBValueActionParameters {
  FCBName: string;
}

/**
 * msdyn_GetFCBValue action
 *
 * Unbound action
 */
export class msdyn_GetFCBValueAction implements Executable<msdyn_GetFCBValueResponse> {
  constructor(public readonly parameters: msdyn_GetFCBValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCBValue`;

    const body = requestBody({
      FCBName: this.parameters.FCBName,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCBValueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetFCBValueResponse;
  }
}
