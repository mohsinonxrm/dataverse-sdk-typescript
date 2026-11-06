import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset action
 */
export interface msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse;
  }
}
