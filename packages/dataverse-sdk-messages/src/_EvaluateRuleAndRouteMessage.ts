import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * _EvaluateRuleAndRoute request message
 *
 * Web API Action: _EvaluateRuleAndRoute
 */
export class _EvaluateRuleAndRouteRequest
  extends OrganizationRequest
  implements Executable<_EvaluateRuleAndRouteResponse>
{
  constructor(
    public target: EntityReference | AnyEntityPayload,
    public routingRuleSetId: string
  ) {
    super("_EvaluateRuleAndRoute");
  }

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
    return new _EvaluateRuleAndRouteResponse();
  }
}

/**
 * _EvaluateRuleAndRoute response message
 */
export class _EvaluateRuleAndRouteResponse extends OrganizationResponse {
  constructor() {
    super("_EvaluateRuleAndRoute");
  }

  static fromResponse(_data: unknown): _EvaluateRuleAndRouteResponse {
    return new _EvaluateRuleAndRouteResponse();
  }
}
