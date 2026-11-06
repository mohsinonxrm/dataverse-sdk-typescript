import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from _MoveRoutingRuleItemAt action
 */
export interface _MoveRoutingRuleItemAtResponse {
  // No content returned
}

/**
 * Parameters of the _MoveRoutingRuleItemAt action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _MoveRoutingRuleItemAtActionParameters {
  RoutingRuleSetId: EntityReference | AnyEntityPayload;
  RoutingRuleItemIdToMove: EntityReference | AnyEntityPayload;
  TargetRoutingRuleItemId: EntityReference | AnyEntityPayload;
  IsBefore: boolean;
  Options?: string;
}

/**
 * _MoveRoutingRuleItemAt action
 *
 * Unbound action
 */
export class _MoveRoutingRuleItemAtAction implements Executable<_MoveRoutingRuleItemAtResponse> {
  constructor(public readonly parameters: _MoveRoutingRuleItemAtActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_MoveRoutingRuleItemAt`;

    const body = requestBody({
      RoutingRuleSetId: this.parameters.RoutingRuleSetId,
      RoutingRuleItemIdToMove: this.parameters.RoutingRuleItemIdToMove,
      TargetRoutingRuleItemId: this.parameters.TargetRoutingRuleItemId,
      IsBefore: this.parameters.IsBefore,
      Options: this.parameters.Options,
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

  async parseResponse(response: Response): Promise<_MoveRoutingRuleItemAtResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as _MoveRoutingRuleItemAtResponse;
  }
}
