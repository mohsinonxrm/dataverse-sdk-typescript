import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * Response from the PublishDuplicateRule action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type PublishDuplicateRuleResponse =
  | (asyncoperation & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

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
    const url = `${baseUrl}/duplicaterules(${odataLiteral.guid(this.duplicateruleId)})/Microsoft.Dynamics.CRM.PublishDuplicateRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishDuplicateRuleResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as PublishDuplicateRuleResponse;
  }
}
