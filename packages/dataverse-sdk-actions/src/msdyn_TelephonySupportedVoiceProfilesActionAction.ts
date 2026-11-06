import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TelephonySupportedVoiceProfilesAction action
 */
export interface msdyn_TelephonySupportedVoiceProfilesActionResponse {
  ActionResult: string;
}

/**
 * Parameters of the msdyn_TelephonySupportedVoiceProfilesAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonySupportedVoiceProfilesActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonySupportedVoiceProfilesAction action
 *
 * Unbound action
 */
export class msdyn_TelephonySupportedVoiceProfilesActionAction implements Executable<msdyn_TelephonySupportedVoiceProfilesActionResponse> {
  constructor(
    public readonly parameters: msdyn_TelephonySupportedVoiceProfilesActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedVoiceProfilesAction`;

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
  ): Promise<msdyn_TelephonySupportedVoiceProfilesActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_TelephonySupportedVoiceProfilesActionResponse;
    return (await response.json()) as msdyn_TelephonySupportedVoiceProfilesActionResponse;
  }
}
