import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from ApplyRecordCreationAndUpdateRule action
 */
export interface ApplyRecordCreationAndUpdateRuleResponse {
  // No content returned
}

/**
 * ApplyRecordCreationAndUpdateRule action
 *
 * Unbound action
 */
export class ApplyRecordCreationAndUpdateRuleAction implements Executable<ApplyRecordCreationAndUpdateRuleResponse> {
  constructor(public readonly target: EntityReference | AnyEntityPayload) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ApplyRecordCreationAndUpdateRule`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<ApplyRecordCreationAndUpdateRuleResponse> {
    // No return value (204 No Content)
    return {};
  }
}
