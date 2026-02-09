import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonySupportedCountryAction action
 */
export interface msdyn_TelephonySupportedCountryActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonySupportedCountryAction action
 *
 * Unbound action
 */
export class msdyn_TelephonySupportedCountryActionAction implements Executable<msdyn_TelephonySupportedCountryActionResponse> {
  constructor(public readonly actionRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedCountryAction`;

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

  async parseResponse(response: Response): Promise<msdyn_TelephonySupportedCountryActionResponse> {
    const data = await response.json();
    return data as msdyn_TelephonySupportedCountryActionResponse;
  }
}
