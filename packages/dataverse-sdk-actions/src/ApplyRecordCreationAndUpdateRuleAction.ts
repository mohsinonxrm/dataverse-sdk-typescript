import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the ApplyRecordCreationAndUpdateRule action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ApplyRecordCreationAndUpdateRuleResponse = void;

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

  parseResponse(_response: Response): Promise<ApplyRecordCreationAndUpdateRuleResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
