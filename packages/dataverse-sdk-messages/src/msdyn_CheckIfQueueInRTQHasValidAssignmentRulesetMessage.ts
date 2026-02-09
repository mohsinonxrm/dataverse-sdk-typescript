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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse> {
    const data = await response.json();
    return msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset response message
 */
export class msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse) {
    super("msdyn_CheckIfQueueInRTQHasValidAssignmentRuleset");
  }

  static fromResponse(data: unknown): msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse {
    return new msdyn_CheckIfQueueInRTQHasValidAssignmentRulesetResponse((data as any).value);
  }
}
