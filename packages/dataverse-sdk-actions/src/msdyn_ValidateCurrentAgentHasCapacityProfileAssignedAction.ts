import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_ValidateCurrentAgentHasCapacityProfileAssigned action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ValidateCurrentAgentHasCapacityProfileAssignedResponse;
  }
}
