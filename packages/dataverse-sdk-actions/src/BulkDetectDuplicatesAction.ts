import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { QueryBase, activityparty } from "./types/index.js";

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
    public readonly query: QueryBase,
    public readonly jobName: string,
    public readonly sendEmailNotification: boolean,
    public readonly templateId: string,
    public readonly toRecipients: activityparty[],
    public readonly cCRecipients: activityparty[],
    public readonly recurrencePattern: string,
    public readonly recurrenceStartTime: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkDetectDuplicates`;

    const body: Record<string, unknown> = {
      Query: this.query,
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
