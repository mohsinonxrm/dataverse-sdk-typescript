import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
    public routingRuleSetIdToClone: EntityReference,
    public routingRuleSetIdToOverwrite: EntityReference,
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<_CloneRoutingRuleSetResponse> {
    const data = await response.json();
    return _CloneRoutingRuleSetResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RoutingRuleSetIdToClone: this.routingRuleSetIdToClone,
      RoutingRuleSetIdToOverwrite: this.routingRuleSetIdToOverwrite,
      Options: this.options,
    };
  }
}

/**
 * _CloneRoutingRuleSet response message
 */
export class _CloneRoutingRuleSetResponse extends OrganizationResponse {
  constructor(public result: _CloneRoutingRuleSetResponse) {
    super("_CloneRoutingRuleSet");
  }

  static fromResponse(data: unknown): _CloneRoutingRuleSetResponse {
    return new _CloneRoutingRuleSetResponse((data as any).value);
  }
}
