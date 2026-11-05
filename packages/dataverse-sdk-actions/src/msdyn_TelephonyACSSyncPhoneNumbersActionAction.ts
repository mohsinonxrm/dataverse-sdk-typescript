import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonyACSSyncPhoneNumbersAction action
 */
export interface msdyn_TelephonyACSSyncPhoneNumbersActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonyACSSyncPhoneNumbersAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyACSSyncPhoneNumbersActionAction implements Executable<msdyn_TelephonyACSSyncPhoneNumbersActionResponse> {
  constructor(public readonly actionRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyACSSyncPhoneNumbersAction`;

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
  ): Promise<msdyn_TelephonyACSSyncPhoneNumbersActionResponse> {
    const data = await response.json();
    return data as msdyn_TelephonyACSSyncPhoneNumbersActionResponse;
  }
}
