import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonyPhoneNumbersDeprovisionAction action
 */
export interface msdyn_TelephonyPhoneNumbersDeprovisionActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonyPhoneNumbersDeprovisionAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyPhoneNumbersDeprovisionActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyPhoneNumbersDeprovisionAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyPhoneNumbersDeprovisionActionAction implements Executable<msdyn_TelephonyPhoneNumbersDeprovisionActionResponse> {
  constructor(
    public readonly parameters: msdyn_TelephonyPhoneNumbersDeprovisionActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumbersDeprovisionAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumbersDeprovisionActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_TelephonyPhoneNumbersDeprovisionActionResponse;
  }
}
