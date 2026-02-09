import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UserSecurityRoleDeltaSyncActor action
 */
export interface msdyn_UserSecurityRoleDeltaSyncActorResponse {
  // No content returned
}

/**
 * msdyn_UserSecurityRoleDeltaSyncActor action
 *
 * Unbound action
 */
export class msdyn_UserSecurityRoleDeltaSyncActorAction implements Executable<msdyn_UserSecurityRoleDeltaSyncActorResponse> {
  constructor(public readonly inputData: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UserSecurityRoleDeltaSyncActor`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_UserSecurityRoleDeltaSyncActorResponse> {
    // No return value (204 No Content)
    return {};
  }
}
