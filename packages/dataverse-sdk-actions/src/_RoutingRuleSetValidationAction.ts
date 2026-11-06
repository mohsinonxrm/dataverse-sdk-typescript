import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the _RoutingRuleSetValidation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _RoutingRuleSetValidationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as _RoutingRuleSetValidationResponse;
  }
}
