import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetLeadCallPrepSheetDetails action
 */
export interface msdyn_GetLeadCallPrepSheetDetailsResponse {
  msdyn_label: string;
  msdyn_url: string;
}

/**
 * Parameters of the msdyn_GetLeadCallPrepSheetDetails action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetLeadCallPrepSheetDetailsActionParameters {
  msdyn_leadid: string;
}

/**
 * msdyn_GetLeadCallPrepSheetDetails action
 *
 * Unbound action
 */
export class msdyn_GetLeadCallPrepSheetDetailsAction implements Executable<msdyn_GetLeadCallPrepSheetDetailsResponse> {
  constructor(public readonly parameters: msdyn_GetLeadCallPrepSheetDetailsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLeadCallPrepSheetDetails`;

    const body = requestBody({
      msdyn_leadid: this.parameters.msdyn_leadid,
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

  async parseResponse(response: Response): Promise<msdyn_GetLeadCallPrepSheetDetailsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetLeadCallPrepSheetDetailsResponse;
  }
}
