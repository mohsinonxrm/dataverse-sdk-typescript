import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetLeadCallPrepSheetDetails action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetLeadCallPrepSheetDetailsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetLeadCallPrepSheetDetailsResponse;
  }
}
