import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UnpublishDuplicateRule action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UnpublishDuplicateRuleResponse = void;

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

  parseResponse(_response: Response): Promise<UnpublishDuplicateRuleResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
