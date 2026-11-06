import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FSDemoDataRequest action
 */
export interface msdyn_FSDemoDataRequestResponse {
  Response: string;
}

/**
 * Parameters of the msdyn_FSDemoDataRequest action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FSDemoDataRequestActionParameters {
  Operation: string;
}

/**
 * msdyn_FSDemoDataRequest action
 *
 * Unbound action
 */
export class msdyn_FSDemoDataRequestAction implements Executable<msdyn_FSDemoDataRequestResponse> {
  constructor(public readonly parameters: msdyn_FSDemoDataRequestActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FSDemoDataRequest`;

    const body = requestBody({
      Operation: this.parameters.Operation,
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

  async parseResponse(response: Response): Promise<msdyn_FSDemoDataRequestResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_FSDemoDataRequestResponse;
  }
}
