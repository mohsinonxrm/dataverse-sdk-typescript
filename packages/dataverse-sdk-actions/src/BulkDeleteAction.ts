import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { QueryExpression, activityparty } from "./types/index.js";

/**
 * Response from BulkDelete action
 */
export interface BulkDeleteResponse {
  JobId: string;
}

/**
 * BulkDelete action
 *
 * Unbound action
 */
export class BulkDeleteAction implements Executable<BulkDeleteResponse> {
  constructor(
    public readonly querySet: QueryExpression[] | undefined,
    public readonly jobName: string,
    public readonly sendEmailNotification: boolean,
    public readonly toRecipients: (EntityReference | EntityPayload<activityparty>)[],
    public readonly cCRecipients: (EntityReference | EntityPayload<activityparty>)[],
    public readonly recurrencePattern: string,
    public readonly startDateTime: string,
    public readonly sourceImportId?: string,
    public readonly runNow?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkDelete`;

    const body: Record<string, unknown> = {
      QuerySet: this.querySet,
      JobName: this.jobName,
      SendEmailNotification: this.sendEmailNotification,
      ToRecipients: this.toRecipients,
      CCRecipients: this.cCRecipients,
      RecurrencePattern: this.recurrencePattern,
      StartDateTime: this.startDateTime,
      SourceImportId: this.sourceImportId,
      RunNow: this.runNow,
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

  async parseResponse(response: Response): Promise<BulkDeleteResponse> {
    const data = await response.json();
    return data as BulkDeleteResponse;
  }
}
