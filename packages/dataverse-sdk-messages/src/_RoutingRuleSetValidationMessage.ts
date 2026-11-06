import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the _RoutingRuleSetValidation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _RoutingRuleSetValidationRequestParameters {
  RoutingRuleSet: EntityReference | AnyEntityPayload;
}

/**
 * _RoutingRuleSetValidation request message
 *
 * Web API Action: _RoutingRuleSetValidation
 */
export class _RoutingRuleSetValidationRequest
  extends OrganizationRequest
  implements Executable<_RoutingRuleSetValidationResponse>
{
  declare readonly Parameters: Readonly<_RoutingRuleSetValidationRequestParameters>;

  constructor(parameters: _RoutingRuleSetValidationRequestParameters) {
    super("_RoutingRuleSetValidation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_RoutingRuleSetValidation`;

    const body = requestBody({
      RoutingRuleSet: this.Parameters.RoutingRuleSet,
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

  async parseResponse(response: Response): Promise<_RoutingRuleSetValidationResponse> {
    // The body is the complex value, with its @odata.context
    return _RoutingRuleSetValidationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the _RoutingRuleSetValidation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _RoutingRuleSetValidationResult {
  "@odata.context"?: string;
  ValidationMessageToDisplay: string;
  ValidationMessageToDownload: string;
}

/**
 * _RoutingRuleSetValidation response message
 *
 * `result` is the value the _RoutingRuleSetValidation action returns (see {@link _RoutingRuleSetValidationResult}).
 */
export class _RoutingRuleSetValidationResponse extends OrganizationResponse {
  constructor(public result: _RoutingRuleSetValidationResult) {
    super("_RoutingRuleSetValidation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): _RoutingRuleSetValidationResponse {
    return new _RoutingRuleSetValidationResponse(data as _RoutingRuleSetValidationResult);
  }
}
