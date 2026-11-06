import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { _RoutingRuleSetValidationResponse as _RoutingRuleSetValidationResponseData } from "./types/index.js";

/**
 * _RoutingRuleSetValidation request message
 *
 * Web API Action: _RoutingRuleSetValidation
 */
export class _RoutingRuleSetValidationRequest
  extends OrganizationRequest
  implements Executable<_RoutingRuleSetValidationResponse>
{
  constructor(public routingRuleSet: EntityReference | AnyEntityPayload) {
    super("_RoutingRuleSetValidation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_RoutingRuleSetValidation`;

    const body: Record<string, unknown> = {
      RoutingRuleSet: this.routingRuleSet,
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

  async parseResponse(response: Response): Promise<_RoutingRuleSetValidationResponse> {
    const data = await response.json();
    return _RoutingRuleSetValidationResponse.fromResponse(data);
  }
}

/**
 * _RoutingRuleSetValidation response message
 */
export class _RoutingRuleSetValidationResponse extends OrganizationResponse {
  constructor(public result: _RoutingRuleSetValidationResponseData) {
    super("_RoutingRuleSetValidation");
  }

  static fromResponse(data: unknown): _RoutingRuleSetValidationResponse {
    return new _RoutingRuleSetValidationResponse(
      responseObject<_RoutingRuleSetValidationResponseData>(data)
    );
  }
}
