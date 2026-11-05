import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * _MoveRoutingRuleItemAt request message
 *
 * Web API Action: _MoveRoutingRuleItemAt
 */
export class _MoveRoutingRuleItemAtRequest
  extends OrganizationRequest
  implements Executable<_MoveRoutingRuleItemAtResponse>
{
  constructor(
    public routingRuleSetId: EntityReference,
    public routingRuleItemIdToMove: EntityReference,
    public targetRoutingRuleItemId: EntityReference,
    public isBefore: boolean,
    public options: string
  ) {
    super("_MoveRoutingRuleItemAt");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_MoveRoutingRuleItemAt`;

    const body: Record<string, unknown> = {
      RoutingRuleSetId: this.routingRuleSetId,
      RoutingRuleItemIdToMove: this.routingRuleItemIdToMove,
      TargetRoutingRuleItemId: this.targetRoutingRuleItemId,
      IsBefore: this.isBefore,
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

  async parseResponse(response: Response): Promise<_MoveRoutingRuleItemAtResponse> {
    // No return value (204 No Content)
    return new _MoveRoutingRuleItemAtResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RoutingRuleSetId: this.routingRuleSetId,
      RoutingRuleItemIdToMove: this.routingRuleItemIdToMove,
      TargetRoutingRuleItemId: this.targetRoutingRuleItemId,
      IsBefore: this.isBefore,
      Options: this.options,
    };
  }
}

/**
 * _MoveRoutingRuleItemAt response message
 */
export class _MoveRoutingRuleItemAtResponse extends OrganizationResponse {
  constructor() {
    super("_MoveRoutingRuleItemAt");
  }

  static fromResponse(_data: unknown): _MoveRoutingRuleItemAtResponse {
    return new _MoveRoutingRuleItemAtResponse();
  }
}
