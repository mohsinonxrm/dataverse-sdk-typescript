import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetRICommonFCBStatus action
 */
export interface msdyn_GetRICommonFCBStatusResponse {
  Status: boolean;
}

/**
 * Parameters of the msdyn_GetRICommonFCBStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRICommonFCBStatusActionParameters {
  FCBName: string;
}

/**
 * msdyn_GetRICommonFCBStatus action
 *
 * Unbound action
 */
export class msdyn_GetRICommonFCBStatusAction implements Executable<msdyn_GetRICommonFCBStatusResponse> {
  constructor(public readonly parameters: msdyn_GetRICommonFCBStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRICommonFCBStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_GetRICommonFCBStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetRICommonFCBStatusResponse;
  }
}
