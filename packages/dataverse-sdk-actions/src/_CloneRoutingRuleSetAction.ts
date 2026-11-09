import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the _CloneRoutingRuleSet action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _CloneRoutingRuleSetResponse {
  "@odata.context"?: string;
  RoutingRuleSetCopyRecordId: string;
}

/**
 * Parameters of the _CloneRoutingRuleSet action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _CloneRoutingRuleSetActionParameters {
  RoutingRuleSetIdToClone: EntityReference | AnyEntityPayload;
  RoutingRuleSetIdToOverwrite?: EntityReference | AnyEntityPayload;
  Options: string;
}

/**
 * _CloneRoutingRuleSet action
 *
 * Unbound action
 */
export class _CloneRoutingRuleSetAction implements Executable<_CloneRoutingRuleSetResponse> {
  constructor(public readonly parameters: _CloneRoutingRuleSetActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_CloneRoutingRuleSet`;

    const body = requestBody({
      RoutingRuleSetIdToClone: this.parameters.RoutingRuleSetIdToClone,
      RoutingRuleSetIdToOverwrite: this.parameters.RoutingRuleSetIdToOverwrite,
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

  async parseResponse(response: Response): Promise<_CloneRoutingRuleSetResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as _CloneRoutingRuleSetResponse;
  }
}
