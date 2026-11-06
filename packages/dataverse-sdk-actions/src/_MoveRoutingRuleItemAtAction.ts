import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from _MoveRoutingRuleItemAt action
 */
export interface _MoveRoutingRuleItemAtResponse {
  // No content returned
}

/**
 * _MoveRoutingRuleItemAt action
 *
 * Unbound action
 */
export class _MoveRoutingRuleItemAtAction implements Executable<_MoveRoutingRuleItemAtResponse> {
  constructor(
    public readonly routingRuleSetId: EntityReference | AnyEntityPayload,
    public readonly routingRuleItemIdToMove: EntityReference | AnyEntityPayload,
    public readonly targetRoutingRuleItemId: EntityReference | AnyEntityPayload,
    public readonly isBefore: boolean,
    public readonly options?: string
  ) {}

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
    return {};
  }
}
