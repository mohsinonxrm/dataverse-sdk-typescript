import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ValidateCurrentAgentHasCapacityProfileAssigned action
 */
export interface msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse {
  ActionResult: boolean;
}

/**
 * msdyn_ValidateCurrentAgentHasCapacityProfileAssigned action
 *
 * Unbound action
 */
export class msdyn_ValidateCurrentAgentHasCapacityProfileAssignedAction implements Executable<msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateCurrentAgentHasCapacityProfileAssigned`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse;
    return (await response.json()) as msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse;
  }
}
