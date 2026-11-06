import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { _CloneRoutingRuleSetResponse as _CloneRoutingRuleSetResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return _CloneRoutingRuleSetResponse.fromResponse({});
    return _CloneRoutingRuleSetResponse.fromResponse(await response.json());
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
