import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from ApplyRoutingRule action
 */
export interface ApplyRoutingRuleResponse {
  // No content returned
}

/**
 * ApplyRoutingRule action
 *
 * Unbound action
 */
export class ApplyRoutingRuleAction implements Executable<ApplyRoutingRuleResponse> {
  constructor(public readonly target: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ApplyRoutingRule`;

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

  async parseResponse(response: Response): Promise<ApplyRoutingRuleResponse> {
    // No return value (204 No Content)
    return {};
  }
}
