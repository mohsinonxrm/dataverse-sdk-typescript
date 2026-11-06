import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { enumBody } from "./internal/enumBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  BulkDetectDuplicatesResponse as BulkDetectDuplicatesResponseData,
  TypedQueryBase,
  activityparty,
} from "./types/index.js";

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
    public query: TypedQueryBase | undefined,
    public jobName: string,
    public sendEmailNotification: boolean,
    public templateId: string,
    public toRecipients: (EntityReference | EntityPayload<activityparty>)[],
    public cCRecipients: (EntityReference | EntityPayload<activityparty>)[],
    public recurrencePattern: string,
    public recurrenceStartTime: string
  ) {
    super("BulkDetectDuplicates");
  }

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
    return BulkDetectDuplicatesResponse.fromResponse(data);
  }
}

/**
 * BulkDetectDuplicates response message
 */
export class BulkDetectDuplicatesResponse extends OrganizationResponse {
  constructor(public result: BulkDetectDuplicatesResponseData) {
    super("BulkDetectDuplicates");
  }

  static fromResponse(data: unknown): BulkDetectDuplicatesResponse {
    return new BulkDetectDuplicatesResponse(responseObject<BulkDetectDuplicatesResponseData>(data));
  }
}
