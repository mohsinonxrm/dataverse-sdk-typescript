import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the ApplyRoutingRule action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ApplyRoutingRuleResponse = void;

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

  parseResponse(_response: Response): Promise<ApplyRoutingRuleResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
