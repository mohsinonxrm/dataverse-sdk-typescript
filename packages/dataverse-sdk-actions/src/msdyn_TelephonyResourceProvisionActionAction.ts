import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonyResourceProvisionAction action
 */
export interface msdyn_TelephonyResourceProvisionActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonyResourceProvisionAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyResourceProvisionActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyResourceProvisionAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_occommunicationprovidersetting)
 *
 * The first argument is the id of the msdyn_occommunicationprovidersetting record to call it on.
 */
export class msdyn_TelephonyResourceProvisionActionAction implements Executable<msdyn_TelephonyResourceProvisionActionResponse> {
  constructor(
    public readonly msdyn_occommunicationprovidersettingId: string,
    public readonly parameters: msdyn_TelephonyResourceProvisionActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_occommunicationprovidersettings(${this.msdyn_occommunicationprovidersettingId})/Microsoft.Dynamics.CRM.msdyn_TelephonyResourceProvisionAction`;

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

  async parseResponse(response: Response): Promise<msdyn_TelephonyResourceProvisionActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_TelephonyResourceProvisionActionResponse;
  }
}
