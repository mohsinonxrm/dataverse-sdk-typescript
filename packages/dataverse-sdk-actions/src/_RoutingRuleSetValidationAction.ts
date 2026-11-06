import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from _RoutingRuleSetValidation action
 */
export interface _RoutingRuleSetValidationResponse {
  ValidationMessageToDisplay: string;
  ValidationMessageToDownload: string;
}

/**
 * _RoutingRuleSetValidation action
 *
 * Unbound action
 */
export class _RoutingRuleSetValidationAction implements Executable<_RoutingRuleSetValidationResponse> {
  constructor(public readonly routingRuleSet: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_RoutingRuleSetValidation`;

    const body: Record<string, unknown> = {
      RoutingRuleSet: this.routingRuleSet,
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

  async parseResponse(response: Response): Promise<_RoutingRuleSetValidationResponse> {
    const data = await response.json();
    return data as _RoutingRuleSetValidationResponse;
  }
}
