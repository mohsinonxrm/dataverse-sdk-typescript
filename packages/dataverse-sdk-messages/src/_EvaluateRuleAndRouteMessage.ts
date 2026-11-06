import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the _EvaluateRuleAndRoute message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _EvaluateRuleAndRouteRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  RoutingRuleSetId: string;
}

/**
 * _EvaluateRuleAndRoute request message
 *
 * Web API Action: _EvaluateRuleAndRoute
 */
export class _EvaluateRuleAndRouteRequest
  extends OrganizationRequest
  implements Executable<_EvaluateRuleAndRouteResponse>
{
  declare readonly Parameters: Readonly<_EvaluateRuleAndRouteRequestParameters>;

  constructor(parameters: _EvaluateRuleAndRouteRequestParameters) {
    super("_EvaluateRuleAndRoute", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_EvaluateRuleAndRoute`;

    const body = requestBody({
      Target: this.Parameters.Target,
      RoutingRuleSetId: this.Parameters.RoutingRuleSetId,
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

  parseResponse(_response: Response): Promise<_EvaluateRuleAndRouteResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new _EvaluateRuleAndRouteResponse());
  }
}

/**
 * _EvaluateRuleAndRoute response message
 */
export class _EvaluateRuleAndRouteResponse extends OrganizationResponse {
  constructor() {
    super("_EvaluateRuleAndRoute");
  }

  static fromResponse(_data?: unknown): _EvaluateRuleAndRouteResponse {
    return new _EvaluateRuleAndRouteResponse();
  }
}
