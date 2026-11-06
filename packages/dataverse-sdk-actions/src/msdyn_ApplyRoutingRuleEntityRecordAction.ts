import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ApplyRoutingRuleEntityRecord action
 */
export interface msdyn_ApplyRoutingRuleEntityRecordResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ApplyRoutingRuleEntityRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ApplyRoutingRuleEntityRecordActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ApplyRoutingRuleEntityRecord action
 *
 * Unbound action
 */
export class msdyn_ApplyRoutingRuleEntityRecordAction implements Executable<msdyn_ApplyRoutingRuleEntityRecordResponse> {
  constructor(public readonly parameters: msdyn_ApplyRoutingRuleEntityRecordActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ApplyRoutingRuleEntityRecord`;

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

  async parseResponse(response: Response): Promise<msdyn_ApplyRoutingRuleEntityRecordResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ApplyRoutingRuleEntityRecordResponse;
  }
}
