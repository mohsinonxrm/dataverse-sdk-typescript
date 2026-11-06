import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * Response from PublishDuplicateRule action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface PublishDuplicateRuleResponse extends asyncoperation {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * PublishDuplicateRule action
 *
 * Bound action
 * Binding parameter: entity (mscrm.duplicaterule)
 *
 * The first argument is the id of the duplicaterule record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishDuplicateRuleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as PublishDuplicateRuleResponse;
  }
}
