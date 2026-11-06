import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetResourcePopupDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetResourcePopupDetailsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetResourcePopupDetailsResponse;
  }
}
