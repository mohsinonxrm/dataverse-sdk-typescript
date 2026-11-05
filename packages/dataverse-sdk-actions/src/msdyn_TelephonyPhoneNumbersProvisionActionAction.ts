import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonyPhoneNumbersProvisionAction action
 */
export interface msdyn_TelephonyPhoneNumbersProvisionActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumbersProvisionAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyPhoneNumbersProvisionActionAction implements Executable<msdyn_TelephonyPhoneNumbersProvisionActionResponse> {
  constructor(public readonly actionRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumbersProvisionAction`;

    const body: Record<string, unknown> = {
      ActionRequest: this.actionRequest,
    };

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
  ): Promise<msdyn_TelephonyPhoneNumbersProvisionActionResponse> {
    const data = await response.json();
    return data as msdyn_TelephonyPhoneNumbersProvisionActionResponse;
  }
}
