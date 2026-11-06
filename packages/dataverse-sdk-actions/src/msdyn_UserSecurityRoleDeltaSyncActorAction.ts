import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UserSecurityRoleDeltaSyncActor action
 */
export interface msdyn_UserSecurityRoleDeltaSyncActorResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UserSecurityRoleDeltaSyncActor action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UserSecurityRoleDeltaSyncActorActionParameters {
  InputData: string;
}

/**
 * msdyn_UserSecurityRoleDeltaSyncActor action
 *
 * Unbound action
 */
export class msdyn_UserSecurityRoleDeltaSyncActorAction implements Executable<msdyn_UserSecurityRoleDeltaSyncActorResponse> {
  constructor(public readonly parameters: msdyn_UserSecurityRoleDeltaSyncActorActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UserSecurityRoleDeltaSyncActor`;

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

  async parseResponse(response: Response): Promise<msdyn_UserSecurityRoleDeltaSyncActorResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UserSecurityRoleDeltaSyncActorResponse;
    return (await response.json()) as msdyn_UserSecurityRoleDeltaSyncActorResponse;
  }
}
