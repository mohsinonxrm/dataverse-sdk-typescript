import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from _CloneRoutingRuleSet action
 */
export interface _CloneRoutingRuleSetResponse {
  RoutingRuleSetCopyRecordId: string;
}

/**
 * _CloneRoutingRuleSet action
 *
 * Unbound action
 */
export class _CloneRoutingRuleSetAction implements Executable<_CloneRoutingRuleSetResponse> {
  constructor(
    public readonly routingRuleSetIdToClone: EntityReference,
    public readonly routingRuleSetIdToOverwrite: EntityReference,
    public readonly options: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_CloneRoutingRuleSet`;

    const body: Record<string, unknown> = {
      RoutingRuleSetIdToClone: this.routingRuleSetIdToClone,
      RoutingRuleSetIdToOverwrite: this.routingRuleSetIdToOverwrite,
      Options: this.options,
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

  async parseResponse(response: Response): Promise<_CloneRoutingRuleSetResponse> {
    const data = await response.json();
    return data as _CloneRoutingRuleSetResponse;
  }
}
