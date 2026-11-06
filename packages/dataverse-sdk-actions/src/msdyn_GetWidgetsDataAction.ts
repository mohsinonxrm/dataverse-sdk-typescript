import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetWidgetsData action
 */
export interface msdyn_GetWidgetsDataResponse {
  msdyn_response: string;
}

/**
 * Parameters of the msdyn_GetWidgetsData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetWidgetsDataActionParameters {
  msdyn_request: string;
  msdyn_entityname?: string;
  msdyn_widgettype: string;
  msdyn_widgetid: string;
  msdyn_recordid?: string;
}

/**
 * msdyn_GetWidgetsData action
 *
 * Unbound action
 */
export class msdyn_GetWidgetsDataAction implements Executable<msdyn_GetWidgetsDataResponse> {
  constructor(public readonly parameters: msdyn_GetWidgetsDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWidgetsData`;

    const body = requestBody({
      msdyn_request: this.parameters.msdyn_request,
      msdyn_entityname: this.parameters.msdyn_entityname,
      msdyn_widgettype: this.parameters.msdyn_widgettype,
      msdyn_widgetid: this.parameters.msdyn_widgetid,
      msdyn_recordid: this.parameters.msdyn_recordid,
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

  async parseResponse(response: Response): Promise<msdyn_GetWidgetsDataResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetWidgetsDataResponse;
    return (await response.json()) as msdyn_GetWidgetsDataResponse;
  }
}
