import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ApplyRoutingRuleEntityRecord action
 */
export interface msdyn_ApplyRoutingRuleEntityRecordResponse {
  // No content returned
}

/**
 * msdyn_ApplyRoutingRuleEntityRecord action
 *
 * Unbound action
 */
export class msdyn_ApplyRoutingRuleEntityRecordAction implements Executable<msdyn_ApplyRoutingRuleEntityRecordResponse> {
  constructor(public readonly target: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ApplyRoutingRuleEntityRecord`;

    const body: Record<string, unknown> = {
      Target: this.target,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ApplyRoutingRuleEntityRecordResponse> {
    // No return value (204 No Content)
    return {};
  }
}
