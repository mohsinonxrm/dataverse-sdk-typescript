import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonyPhoneNumberAreaCodeAction action
 */
export interface msdyn_TelephonyPhoneNumberAreaCodeActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonyPhoneNumberAreaCodeAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyPhoneNumberAreaCodeActionAction implements Executable<msdyn_TelephonyPhoneNumberAreaCodeActionResponse> {
  constructor(public readonly actionRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPhoneNumberAreaCodeAction`;

    const body: Record<string, unknown> = {
      ActionRequest: this.actionRequest,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_TelephonyPhoneNumberAreaCodeActionResponse> {
    const data = await response.json();
    return data as msdyn_TelephonyPhoneNumberAreaCodeActionResponse;
  }
}
