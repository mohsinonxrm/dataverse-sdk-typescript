import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { BulkDeleteOptions, QueryExpression, activityparty } from "./types/index.js";

/**
 * Parameters of the BulkDelete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BulkDeleteRequestParameters {
  QuerySet?: QueryExpression[];
  JobName: string;
  SendEmailNotification: boolean;
  ToRecipients: (EntityReference | EntityPayload<activityparty>)[];
  CCRecipients: (EntityReference | EntityPayload<activityparty>)[];
  RecurrencePattern: string;
  StartDateTime: string;
  SourceImportId?: string;
  RunNow?: boolean;
  Options?: BulkDeleteOptions;
}

/**
 * BulkDelete request message
 *
 * Web API Action: BulkDelete
 */
export class BulkDeleteRequest
  extends OrganizationRequest
  implements Executable<BulkDeleteResponse>
{
  declare readonly Parameters: Readonly<BulkDeleteRequestParameters>;

  constructor(parameters: BulkDeleteRequestParameters) {
    super("BulkDelete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkDelete`;

    const body = requestBody({
      QuerySet: enumBody(this.Parameters.QuerySet, "QueryExpression"),
      JobName: this.Parameters.JobName,
      SendEmailNotification: this.Parameters.SendEmailNotification,
      ToRecipients: this.Parameters.ToRecipients,
      CCRecipients: this.Parameters.CCRecipients,
      RecurrencePattern: this.Parameters.RecurrencePattern,
      StartDateTime: this.Parameters.StartDateTime,
      SourceImportId: this.Parameters.SourceImportId,
      RunNow: this.Parameters.RunNow,
      Options: this.Parameters.Options,
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

  async parseResponse(response: Response): Promise<BulkDeleteResponse> {
    // The body is the complex value, with its @odata.context
    return BulkDeleteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the BulkDelete action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BulkDeleteResult {
  "@odata.context"?: string;
  JobId: string;
}

/**
 * BulkDelete response message
 *
 * `result` is the value the BulkDelete action returns (see {@link BulkDeleteResult}).
 */
export class BulkDeleteResponse extends OrganizationResponse {
  constructor(public result: BulkDeleteResult) {
    super("BulkDelete");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): BulkDeleteResponse {
    return new BulkDeleteResponse(data as BulkDeleteResult);
  }
}
