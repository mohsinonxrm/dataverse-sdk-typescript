import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the _MoveRoutingRuleItemAt message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _MoveRoutingRuleItemAtRequestParameters {
  RoutingRuleSetId: EntityReference | AnyEntityPayload;
  RoutingRuleItemIdToMove: EntityReference | AnyEntityPayload;
  TargetRoutingRuleItemId: EntityReference | AnyEntityPayload;
  IsBefore: boolean;
  Options?: string;
}

/**
 * _MoveRoutingRuleItemAt request message
 *
 * Web API Action: _MoveRoutingRuleItemAt
 */
export class _MoveRoutingRuleItemAtRequest
  extends OrganizationRequest
  implements Executable<_MoveRoutingRuleItemAtResponse>
{
  declare readonly Parameters: Readonly<_MoveRoutingRuleItemAtRequestParameters>;

  constructor(parameters: _MoveRoutingRuleItemAtRequestParameters) {
    super("_MoveRoutingRuleItemAt", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_MoveRoutingRuleItemAt`;

    const body = requestBody({
      RoutingRuleSetId: this.Parameters.RoutingRuleSetId,
      RoutingRuleItemIdToMove: this.Parameters.RoutingRuleItemIdToMove,
      TargetRoutingRuleItemId: this.Parameters.TargetRoutingRuleItemId,
      IsBefore: this.Parameters.IsBefore,
      Options: this.Parameters.Options,
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
    // No return value (204 No Content)
    return new _MoveRoutingRuleItemAtResponse();
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
