import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { QueryExpression, activityparty } from "./types/index.js";

/**
 * BulkDelete request message
 *
 * Web API Action: BulkDelete
 */
export class BulkDeleteRequest
  extends OrganizationRequest
  implements Executable<BulkDeleteResponse>
{
  constructor(
    public querySet: QueryExpression[],
    public jobName: string,
    public sendEmailNotification: boolean,
    public toRecipients: activityparty[],
    public cCRecipients: activityparty[],
    public recurrencePattern: string,
    public startDateTime: string,
    public sourceImportId: string,
    public runNow: boolean
  ) {
    super("BulkDelete");
  }

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
    return BulkDeleteResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
  }
}

/**
 * BulkDelete response message
 */
export class BulkDeleteResponse extends OrganizationResponse {
  constructor(public result: BulkDeleteResponse) {
    super("BulkDelete");
  }

  static fromResponse(data: unknown): BulkDeleteResponse {
    return new BulkDeleteResponse((data as any).value);
  }
}
