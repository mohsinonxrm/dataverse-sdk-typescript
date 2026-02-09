import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TelephonyResourceDeprovisionAction action
 */
export interface msdyn_TelephonyResourceDeprovisionActionResponse {
  ActionResult: string;
}

/**
 * msdyn_TelephonyResourceDeprovisionAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_occommunicationprovidersetting)
 */
export class msdyn_TelephonyResourceDeprovisionActionAction implements Executable<msdyn_TelephonyResourceDeprovisionActionResponse> {
  constructor(
    public readonly msdyn_occommunicationprovidersettingId: string,
    public readonly actionRequest: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_occommunicationprovidersettings(${this.msdyn_occommunicationprovidersettingId})/Microsoft.Dynamics.CRM.msdyn_TelephonyResourceDeprovisionAction`;

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
  ): Promise<msdyn_TelephonyResourceDeprovisionActionResponse> {
    const data = await response.json();
    return data as msdyn_TelephonyResourceDeprovisionActionResponse;
  }
}
