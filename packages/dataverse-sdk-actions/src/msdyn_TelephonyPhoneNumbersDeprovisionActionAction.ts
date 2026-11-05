import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonyPhoneNumbersDeprovisionAction action
 */
export interface msdyn_TelephonyPhoneNumbersDeprovisionActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumbersDeprovisionAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyPhoneNumbersDeprovisionActionAction implements Executable<msdyn_TelephonyPhoneNumbersDeprovisionActionResponse> {
  constructor(public readonly actionRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumbersDeprovisionAction`;

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
  ): Promise<msdyn_TelephonyPhoneNumbersDeprovisionActionResponse> {
    const data = await response.json();
    return data as msdyn_TelephonyPhoneNumbersDeprovisionActionResponse;
  }
}
