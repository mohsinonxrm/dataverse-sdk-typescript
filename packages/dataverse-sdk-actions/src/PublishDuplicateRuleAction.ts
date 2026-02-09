import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * Response from PublishDuplicateRule action
 */
export interface PublishDuplicateRuleResponse {
  value: asyncoperation;
}

/**
 * PublishDuplicateRule action
 *
 * Bound action
 * Binding parameter: entity (mscrm.duplicaterule)
 */
export class PublishDuplicateRuleAction implements Executable<PublishDuplicateRuleResponse> {
  constructor(public readonly duplicateruleId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/duplicaterules(${this.duplicateruleId})/Microsoft.Dynamics.CRM.PublishDuplicateRule`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishDuplicateRuleResponse> {
    const data = await response.json();
    return data as PublishDuplicateRuleResponse;
  }
}
