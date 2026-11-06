import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from ApplyRecordCreationAndUpdateRule action
 */
export interface ApplyRecordCreationAndUpdateRuleResponse {
  // No content returned
}

/**
 * Parameters of the ApplyRecordCreationAndUpdateRule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ApplyRecordCreationAndUpdateRuleActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * ApplyRecordCreationAndUpdateRule action
 *
 * Unbound action
 */
export class ApplyRecordCreationAndUpdateRuleAction implements Executable<ApplyRecordCreationAndUpdateRuleResponse> {
  constructor(public readonly parameters: ApplyRecordCreationAndUpdateRuleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ApplyRecordCreationAndUpdateRule`;

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

  async parseResponse(response: Response): Promise<ApplyRecordCreationAndUpdateRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as ApplyRecordCreationAndUpdateRuleResponse;
  }
}
