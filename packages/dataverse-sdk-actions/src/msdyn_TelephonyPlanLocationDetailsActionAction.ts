import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonyPlanLocationDetailsAction action
 */
export interface msdyn_TelephonyPlanLocationDetailsActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonyPlanLocationDetailsAction action
 *
 * Unbound action
 */
export class msdyn_TelephonyPlanLocationDetailsActionAction implements Executable<msdyn_TelephonyPlanLocationDetailsActionResponse> {
  constructor(public readonly actionRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyPlanLocationDetailsAction`;

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
  ): Promise<msdyn_TelephonyPlanLocationDetailsActionResponse> {
    const data = await response.json();
    return data as msdyn_TelephonyPlanLocationDetailsActionResponse;
  }
}
