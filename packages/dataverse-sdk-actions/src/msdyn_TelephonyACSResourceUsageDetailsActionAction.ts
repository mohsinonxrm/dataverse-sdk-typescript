import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonyACSResourceUsageDetailsAction action
 */
export interface msdyn_TelephonyACSResourceUsageDetailsActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonyACSResourceUsageDetailsAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyACSResourceUsageDetailsActionAction implements Executable<msdyn_TelephonyACSResourceUsageDetailsActionResponse> {
  constructor(public readonly actionRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyACSResourceUsageDetailsAction`;

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
  ): Promise<msdyn_TelephonyACSResourceUsageDetailsActionResponse> {
    const data = await response.json();
    return data as msdyn_TelephonyACSResourceUsageDetailsActionResponse;
  }
}
