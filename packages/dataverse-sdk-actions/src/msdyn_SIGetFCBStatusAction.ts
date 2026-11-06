import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SIGetFCBStatus action
 */
export interface msdyn_SIGetFCBStatusResponse {
  Status: boolean;
}

/**
 * Parameters of the msdyn_SIGetFCBStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SIGetFCBStatusActionParameters {
  FCBName: string;
}

/**
 * msdyn_SIGetFCBStatus action
 *
 * Unbound action
 */
export class msdyn_SIGetFCBStatusAction implements Executable<msdyn_SIGetFCBStatusResponse> {
  constructor(public readonly parameters: msdyn_SIGetFCBStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SIGetFCBStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_SIGetFCBStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SIGetFCBStatusResponse;
  }
}
