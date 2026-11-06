import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonyResourceDeprovisionAction action
 */
export interface msdyn_TelephonyResourceDeprovisionActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonyResourceDeprovisionAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyResourceDeprovisionActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyResourceDeprovisionAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_occommunicationprovidersetting)
 *
 * The first argument is the id of the msdyn_occommunicationprovidersetting record to call it on.
 */
export class msdyn_TelephonyResourceDeprovisionActionAction implements Executable<msdyn_TelephonyResourceDeprovisionActionResponse> {
  constructor(
    public readonly msdyn_occommunicationprovidersettingId: string,
    public readonly parameters: msdyn_TelephonyResourceDeprovisionActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_occommunicationprovidersettings(${this.msdyn_occommunicationprovidersettingId})/Microsoft.Dynamics.CRM.msdyn_TelephonyResourceDeprovisionAction`;

    const body = requestBody({
      ActionRequest: this.parameters.ActionRequest,
    });

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
  ): Promise<msdyn_TelephonyResourceDeprovisionActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TelephonyResourceDeprovisionActionResponse;
    return (await response.json()) as msdyn_TelephonyResourceDeprovisionActionResponse;
  }
}
