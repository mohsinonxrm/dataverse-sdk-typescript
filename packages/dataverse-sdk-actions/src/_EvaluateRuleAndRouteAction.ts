import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from _EvaluateRuleAndRoute action
 */
export interface _EvaluateRuleAndRouteResponse {
  // No content returned
}

/**
 * Parameters of the _EvaluateRuleAndRoute action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _EvaluateRuleAndRouteActionParameters {
  Target: EntityReference | AnyEntityPayload;
  RoutingRuleSetId: string;
}

/**
 * _EvaluateRuleAndRoute action
 *
 * Unbound action
 */
export class _EvaluateRuleAndRouteAction implements Executable<_EvaluateRuleAndRouteResponse> {
  constructor(public readonly parameters: _EvaluateRuleAndRouteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_EvaluateRuleAndRoute`;

    const body = requestBody({
      Target: this.parameters.Target,
      RoutingRuleSetId: this.parameters.RoutingRuleSetId,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as _EvaluateRuleAndRouteResponse;
    return (await response.json()) as _EvaluateRuleAndRouteResponse;
  }
}
