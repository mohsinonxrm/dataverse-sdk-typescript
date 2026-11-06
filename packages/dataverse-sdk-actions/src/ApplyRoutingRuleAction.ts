import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from ApplyRoutingRule action
 */
export interface ApplyRoutingRuleResponse {
  // No content returned
}

/**
 * Parameters of the ApplyRoutingRule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ApplyRoutingRuleActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * ApplyRoutingRule action
 *
 * Unbound action
 */
export class ApplyRoutingRuleAction implements Executable<ApplyRoutingRuleResponse> {
  constructor(public readonly parameters: ApplyRoutingRuleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ApplyRoutingRule`;

    const body = requestBody({
      Target: this.parameters.Target,
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

  async parseResponse(response: Response): Promise<ApplyRoutingRuleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ApplyRoutingRuleResponse;
    return (await response.json()) as ApplyRoutingRuleResponse;
  }
}
