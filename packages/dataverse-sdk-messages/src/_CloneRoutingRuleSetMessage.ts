import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { _CloneRoutingRuleSetResponse as _CloneRoutingRuleSetResponseData } from "./types/index.js";

/**
 * _CloneRoutingRuleSet request message
 *
 * Web API Action: _CloneRoutingRuleSet
 */
export class _CloneRoutingRuleSetRequest
  extends OrganizationRequest
  implements Executable<_CloneRoutingRuleSetResponse>
{
  constructor(
    public routingRuleSetIdToClone: EntityReference | AnyEntityPayload,
    public routingRuleSetIdToOverwrite: EntityReference | AnyEntityPayload | undefined,
    public options: string
  ) {
    super("_CloneRoutingRuleSet");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_CloneRoutingRuleSet`;

    const body: Record<string, unknown> = {
      RoutingRuleSetIdToClone: this.routingRuleSetIdToClone,
      RoutingRuleSetIdToOverwrite: this.routingRuleSetIdToOverwrite,
      Options: this.options,
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

  async parseResponse(response: Response): Promise<_CloneRoutingRuleSetResponse> {
    const data = await response.json();
    return _CloneRoutingRuleSetResponse.fromResponse(data);
  }
}

/**
 * _CloneRoutingRuleSet response message
 */
export class _CloneRoutingRuleSetResponse extends OrganizationResponse {
  constructor(public result: _CloneRoutingRuleSetResponseData) {
    super("_CloneRoutingRuleSet");
  }

  static fromResponse(data: unknown): _CloneRoutingRuleSetResponse {
    return new _CloneRoutingRuleSetResponse(responseObject<_CloneRoutingRuleSetResponseData>(data));
  }
}
