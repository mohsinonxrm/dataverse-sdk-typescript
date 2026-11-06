import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonyVoiceChannelProvisionAction action
 */
export interface msdyn_TelephonyVoiceChannelProvisionActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonyVoiceChannelProvisionAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyVoiceChannelProvisionActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyVoiceChannelProvisionAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocvoicechannelsetting)
 *
 * The first argument is the id of the msdyn_ocvoicechannelsetting record to call it on.
 */
export class msdyn_TelephonyVoiceChannelProvisionActionAction implements Executable<msdyn_TelephonyVoiceChannelProvisionActionResponse> {
  constructor(
    public readonly msdyn_ocvoicechannelsettingId: string,
    public readonly parameters: msdyn_TelephonyVoiceChannelProvisionActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocvoicechannelsettings(${this.msdyn_ocvoicechannelsettingId})/Microsoft.Dynamics.CRM.msdyn_TelephonyVoiceChannelProvisionAction`;

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
  ): Promise<msdyn_TelephonyVoiceChannelProvisionActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TelephonyVoiceChannelProvisionActionResponse;
    return (await response.json()) as msdyn_TelephonyVoiceChannelProvisionActionResponse;
  }
}
