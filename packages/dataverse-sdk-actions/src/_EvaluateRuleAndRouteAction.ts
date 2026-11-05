import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from _EvaluateRuleAndRoute action
 */
export interface _EvaluateRuleAndRouteResponse {
  // No content returned
}

/**
 * _EvaluateRuleAndRoute action
 *
 * Unbound action
 */
export class _EvaluateRuleAndRouteAction implements Executable<_EvaluateRuleAndRouteResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly routingRuleSetId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_EvaluateRuleAndRoute`;

    const body: Record<string, unknown> = {
      Target: this.target,
      RoutingRuleSetId: this.routingRuleSetId,
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

  async parseResponse(response: Response): Promise<_EvaluateRuleAndRouteResponse> {
    // No return value (204 No Content)
    return {};
  }
}
