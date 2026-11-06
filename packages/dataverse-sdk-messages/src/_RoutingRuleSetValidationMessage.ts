import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { _RoutingRuleSetValidationResponse as _RoutingRuleSetValidationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return _RoutingRuleSetValidationResponse.fromResponse({});
    return _RoutingRuleSetValidationResponse.fromResponse(await response.json());
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
