import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the _CloneRoutingRuleSet message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _CloneRoutingRuleSetRequestParameters {
  RoutingRuleSetIdToClone: EntityReference | AnyEntityPayload;
  RoutingRuleSetIdToOverwrite?: EntityReference | AnyEntityPayload;
  Options: string;
}

/**
 * _CloneRoutingRuleSet request message
 *
 * Web API Action: _CloneRoutingRuleSet
 */
export class _CloneRoutingRuleSetRequest
  extends OrganizationRequest
  implements Executable<_CloneRoutingRuleSetResponse>
{
  declare readonly Parameters: Readonly<_CloneRoutingRuleSetRequestParameters>;

  constructor(parameters: _CloneRoutingRuleSetRequestParameters) {
    super("_CloneRoutingRuleSet", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_CloneRoutingRuleSet`;

    const body = requestBody({
      RoutingRuleSetIdToClone: this.Parameters.RoutingRuleSetIdToClone,
      RoutingRuleSetIdToOverwrite: this.Parameters.RoutingRuleSetIdToOverwrite,
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

  async parseResponse(response: Response): Promise<_CloneRoutingRuleSetResponse> {
    // The body is the complex value, with its @odata.context
    return _CloneRoutingRuleSetResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the _CloneRoutingRuleSet action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _CloneRoutingRuleSetResult {
  "@odata.context"?: string;
  RoutingRuleSetCopyRecordId: string;
}

/**
 * _CloneRoutingRuleSet response message
 *
 * `result` is the value the _CloneRoutingRuleSet action returns (see {@link _CloneRoutingRuleSetResult}).
 */
export class _CloneRoutingRuleSetResponse extends OrganizationResponse {
  constructor(public result: _CloneRoutingRuleSetResult) {
    super("_CloneRoutingRuleSet");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): _CloneRoutingRuleSetResponse {
    return new _CloneRoutingRuleSetResponse(data as _CloneRoutingRuleSetResult);
  }
}
