import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { TypedQueryBase, activityparty } from "./types/index.js";

/**
 * Parameters of the BulkDetectDuplicates message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BulkDetectDuplicatesRequestParameters {
  Query?: TypedQueryBase;
  JobName: string;
  SendEmailNotification: boolean;
  TemplateId: string;
  ToRecipients: (EntityReference | EntityPayload<activityparty>)[];
  CCRecipients: (EntityReference | EntityPayload<activityparty>)[];
  RecurrencePattern: string;
  RecurrenceStartTime: string;
}

/**
 * BulkDetectDuplicates request message
 *
 * Web API Action: BulkDetectDuplicates
 */
export class BulkDetectDuplicatesRequest
  extends OrganizationRequest
  implements Executable<BulkDetectDuplicatesResponse>
{
  declare readonly Parameters: Readonly<BulkDetectDuplicatesRequestParameters>;

  constructor(parameters: BulkDetectDuplicatesRequestParameters) {
    super("BulkDetectDuplicates", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkDetectDuplicates`;

    const body = requestBody({
      Query: enumBody(this.Parameters.Query, "QueryBase"),
      JobName: this.Parameters.JobName,
      SendEmailNotification: this.Parameters.SendEmailNotification,
      TemplateId: this.Parameters.TemplateId,
      ToRecipients: this.Parameters.ToRecipients,
      CCRecipients: this.Parameters.CCRecipients,
      RecurrencePattern: this.Parameters.RecurrencePattern,
      RecurrenceStartTime: this.Parameters.RecurrenceStartTime,
    });

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
    // The body is the complex value, with its @odata.context
    return BulkDetectDuplicatesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the BulkDetectDuplicates action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BulkDetectDuplicatesResult {
  "@odata.context"?: string;
  JobId: string;
}

/**
 * BulkDetectDuplicates response message
 *
 * `result` is the value the BulkDetectDuplicates action returns (see {@link BulkDetectDuplicatesResult}).
 */
export class BulkDetectDuplicatesResponse extends OrganizationResponse {
  constructor(public result: BulkDetectDuplicatesResult) {
    super("BulkDetectDuplicates");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): BulkDetectDuplicatesResponse {
    return new BulkDetectDuplicatesResponse(data as BulkDetectDuplicatesResult);
  }
}
