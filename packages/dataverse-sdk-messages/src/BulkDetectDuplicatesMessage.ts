import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { QueryBase, activityparty } from "./types/index.js";

/**
 * BulkDetectDuplicates request message
 *
 * Web API Action: BulkDetectDuplicates
 */
export class BulkDetectDuplicatesRequest
  extends OrganizationRequest
  implements Executable<BulkDetectDuplicatesResponse>
{
  constructor(
    public query: QueryBase,
    public jobName: string,
    public sendEmailNotification: boolean,
    public templateId: string,
    public toRecipients: activityparty[],
    public cCRecipients: activityparty[],
    public recurrencePattern: string,
    public recurrenceStartTime: string
  ) {
    super("BulkDetectDuplicates");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<BulkDetectDuplicatesResponse> {
    const data = await response.json();
    return BulkDetectDuplicatesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Query: this.query,
      JobName: this.jobName,
      SendEmailNotification: this.sendEmailNotification,
      TemplateId: this.templateId,
      ToRecipients: this.toRecipients,
      CCRecipients: this.cCRecipients,
      RecurrencePattern: this.recurrencePattern,
      RecurrenceStartTime: this.recurrenceStartTime,
    };
  }
}

/**
 * BulkDetectDuplicates response message
 */
export class BulkDetectDuplicatesResponse extends OrganizationResponse {
  constructor(public result: BulkDetectDuplicatesResponse) {
    super("BulkDetectDuplicates");
  }

  static fromResponse(data: unknown): BulkDetectDuplicatesResponse {
    return new BulkDetectDuplicatesResponse((data as any).value);
  }
}
