import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UserOptOutActor action
 */
export interface msdyn_UserOptOutActorResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UserOptOutActor action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UserOptOutActorActionParameters {
  InputData: string;
}

/**
 * msdyn_UserOptOutActor action
 *
 * Unbound action
 */
export class msdyn_UserOptOutActorAction implements Executable<msdyn_UserOptOutActorResponse> {
  constructor(public readonly parameters: msdyn_UserOptOutActorActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UserOptOutActor`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_UserOptOutActorResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UserOptOutActorResponse;
    return (await response.json()) as msdyn_UserOptOutActorResponse;
  }
}
