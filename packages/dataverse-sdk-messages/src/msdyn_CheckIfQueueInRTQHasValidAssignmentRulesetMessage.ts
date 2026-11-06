import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset request message
 *
 * Web API Action: msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset
 */
export class msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse>
{
  constructor() {
    super("msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset");
  }

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
    return msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset response message
 *
 * `result` is the value the msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset action returns (see {@link msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResult}).
 */
export class msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResult) {
    super("msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse {
    return new msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse(
      data as msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResult
    );
  }
}
