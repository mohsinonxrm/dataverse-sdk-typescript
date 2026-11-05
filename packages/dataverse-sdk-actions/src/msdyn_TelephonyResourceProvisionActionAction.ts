import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonyResourceProvisionAction action
 */
export interface msdyn_TelephonyResourceProvisionActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonyResourceProvisionAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_occommunicationprovidersetting)
 */
export class msdyn_TelephonyResourceProvisionActionAction implements Executable<msdyn_TelephonyResourceProvisionActionResponse> {
  constructor(
    public readonly msdyn_occommunicationprovidersettingId: string,
    public readonly actionRequest: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_occommunicationprovidersettings(${this.msdyn_occommunicationprovidersettingId})/Microsoft.Dynamics.CRM.msdyn_TelephonyResourceProvisionAction`;

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

  async parseResponse(response: Response): Promise<msdyn_TelephonyResourceProvisionActionResponse> {
    const data = await response.json();
    return data as msdyn_TelephonyResourceProvisionActionResponse;
  }
}
