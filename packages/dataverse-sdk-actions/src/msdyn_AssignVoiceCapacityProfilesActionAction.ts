import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AssignVoiceCapacityProfilesAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AssignVoiceCapacityProfilesActionResponse {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * Parameters of the msdyn_AssignVoiceCapacityProfilesAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AssignVoiceCapacityProfilesActionActionParameters {
  ActionRequest: string;
}

/**
 * msdyn_AssignVoiceCapacityProfilesAction action
 *
 * Unbound action
 */
export class msdyn_AssignVoiceCapacityProfilesActionAction implements Executable<msdyn_AssignVoiceCapacityProfilesActionResponse> {
  constructor(
    public readonly parameters: msdyn_AssignVoiceCapacityProfilesActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AssignVoiceCapacityProfilesAction`;

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
  ): Promise<msdyn_AssignVoiceCapacityProfilesActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_AssignVoiceCapacityProfilesActionResponse;
  }
}
