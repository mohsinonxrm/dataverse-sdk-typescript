import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UnpublishDuplicateRule action
 */
export interface UnpublishDuplicateRuleResponse {
  // No content returned
}

/**
 * Parameters of the UnpublishDuplicateRule action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnpublishDuplicateRuleActionParameters {
  DuplicateRuleId: string;
}

/**
 * UnpublishDuplicateRule action
 *
 * Unbound action
 */
export class UnpublishDuplicateRuleAction implements Executable<UnpublishDuplicateRuleResponse> {
  constructor(public readonly parameters: UnpublishDuplicateRuleActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UnpublishDuplicateRule`;

    const body = requestBody({
      DuplicateRuleId: this.parameters.DuplicateRuleId,
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

  async parseResponse(response: Response): Promise<UnpublishDuplicateRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UnpublishDuplicateRuleResponse;
  }
}
