import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from _RoutingRuleSetValidation action
 */
export interface _RoutingRuleSetValidationResponse {
  ValidationMessageToDisplay: string;
  ValidationMessageToDownload: string;
}

/**
 * Parameters of the _RoutingRuleSetValidation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _RoutingRuleSetValidationActionParameters {
  RoutingRuleSet: EntityReference | AnyEntityPayload;
}

/**
 * _RoutingRuleSetValidation action
 *
 * Unbound action
 */
export class _RoutingRuleSetValidationAction implements Executable<_RoutingRuleSetValidationResponse> {
  constructor(public readonly parameters: _RoutingRuleSetValidationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_RoutingRuleSetValidation`;

    const body = requestBody({
      RoutingRuleSet: this.parameters.RoutingRuleSet,
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
    if (response.status === 204) return {} as _RoutingRuleSetValidationResponse;
    return (await response.json()) as _RoutingRuleSetValidationResponse;
  }
}
