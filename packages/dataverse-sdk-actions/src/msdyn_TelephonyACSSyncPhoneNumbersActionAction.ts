import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonyACSSyncPhoneNumbersAction action
 */
export interface msdyn_TelephonyACSSyncPhoneNumbersActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonyACSSyncPhoneNumbersAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyACSSyncPhoneNumbersActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyACSSyncPhoneNumbersAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyACSSyncPhoneNumbersActionAction implements Executable<msdyn_TelephonyACSSyncPhoneNumbersActionResponse> {
  constructor(
    public readonly parameters: msdyn_TelephonyACSSyncPhoneNumbersActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyACSSyncPhoneNumbersAction`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_TelephonyACSSyncPhoneNumbersActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TelephonyACSSyncPhoneNumbersActionResponse;
    return (await response.json()) as msdyn_TelephonyACSSyncPhoneNumbersActionResponse;
  }
}
