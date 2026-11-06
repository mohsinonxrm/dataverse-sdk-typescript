import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AcsForceSyncAction action
 */
export interface msdyn_AcsForceSyncActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_AcsForceSyncAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AcsForceSyncActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_AcsForceSyncAction action
 *
 * Unbound action
 */
export class msdyn_AcsForceSyncActionAction implements Executable<msdyn_AcsForceSyncActionResponse> {
  constructor(public readonly parameters: msdyn_AcsForceSyncActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AcsForceSyncAction`;

    const body = requestBody({
      ActionRequest: this.parameters.ActionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_AcsForceSyncActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_AcsForceSyncActionResponse;
  }
}
