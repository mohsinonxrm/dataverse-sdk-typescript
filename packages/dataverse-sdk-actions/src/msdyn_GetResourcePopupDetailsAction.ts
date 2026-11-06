import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetResourcePopupDetails action
 */
export interface msdyn_GetResourcePopupDetailsResponse {
  ResourceDetails: string;
}

/**
 * Parameters of the msdyn_GetResourcePopupDetails action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourcePopupDetailsActionParameters {
  StartDate?: string;
  EndDate?: string;
  ResourceId: string;
}

/**
 * msdyn_GetResourcePopupDetails action
 *
 * Unbound action
 */
export class msdyn_GetResourcePopupDetailsAction implements Executable<msdyn_GetResourcePopupDetailsResponse> {
  constructor(public readonly parameters: msdyn_GetResourcePopupDetailsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourcePopupDetails`;

    const body = requestBody({
      StartDate: this.parameters.StartDate,
      EndDate: this.parameters.EndDate,
      ResourceId: this.parameters.ResourceId,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourcePopupDetailsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetResourcePopupDetailsResponse;
  }
}
