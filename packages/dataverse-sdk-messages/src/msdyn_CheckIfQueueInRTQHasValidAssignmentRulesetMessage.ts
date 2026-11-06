import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse as msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset response message
 */
export class msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponseData) {
    super("msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset");
  }

  static fromResponse(data: unknown): msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse {
    return new msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse(
      responseObject<msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponseData>(data)
    );
  }
}
