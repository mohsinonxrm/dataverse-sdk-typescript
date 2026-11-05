import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonySupportedPlansAction action
 */
export interface msdyn_TelephonySupportedPlansActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonySupportedPlansAction action
 *
 * Unbound action
 */
export class msdyn_TelephonySupportedPlansActionAction implements Executable<msdyn_TelephonySupportedPlansActionResponse> {
  constructor(public readonly actionRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedPlansAction`;

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

  async parseResponse(response: Response): Promise<msdyn_TelephonySupportedPlansActionResponse> {
    const data = await response.json();
    return data as msdyn_TelephonySupportedPlansActionResponse;
  }
}
