import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { enumBody } from "./internal/enumBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { TypedQueryBase, activityparty } from "./types/index.js";

/**
 * Response from BulkDetectDuplicates action
 */
export interface BulkDetectDuplicatesResponse {
  JobId: string;
}

/**
 * BulkDetectDuplicates action
 *
 * Unbound action
 */
export class BulkDetectDuplicatesAction implements Executable<BulkDetectDuplicatesResponse> {
  constructor(
    public readonly query: TypedQueryBase | undefined,
    public readonly jobName: string,
    public readonly sendEmailNotification: boolean,
    public readonly templateId: string,
    public readonly toRecipients: (EntityReference | EntityPayload<activityparty>)[],
    public readonly cCRecipients: (EntityReference | EntityPayload<activityparty>)[],
    public readonly recurrencePattern: string,
    public readonly recurrenceStartTime: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkDetectDuplicates`;

    const body: Record<string, unknown> = {
      Query: enumBody(this.query, "QueryBase"),
      JobName: this.jobName,
      SendEmailNotification: this.sendEmailNotification,
      TemplateId: this.templateId,
      ToRecipients: this.toRecipients,
      CCRecipients: this.cCRecipients,
      RecurrencePattern: this.recurrencePattern,
      RecurrenceStartTime: this.recurrenceStartTime,
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

  async parseResponse(response: Response): Promise<BulkDetectDuplicatesResponse> {
    const data = await response.json();
    return data as BulkDetectDuplicatesResponse;
  }
}
