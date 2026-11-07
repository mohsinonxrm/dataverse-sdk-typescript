import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset action
 *
 * Unbound action
 */
export class msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetAction implements Executable<msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset`;

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
  ): Promise<msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse;
  }
}
