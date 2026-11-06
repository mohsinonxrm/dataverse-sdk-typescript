import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  BulkDeleteResponse as BulkDeleteResponseData,
  QueryExpression,
  activityparty,
} from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return BulkDeleteResponse.fromResponse({});
    return BulkDeleteResponse.fromResponse(await response.json());
  }
}

/**
 * BulkDelete response message
 */
export class BulkDeleteResponse extends OrganizationResponse {
  constructor(public result: BulkDeleteResponseData) {
    super("BulkDelete");
  }

  static fromResponse(data: unknown): BulkDeleteResponse {
    return new BulkDeleteResponse(responseObject<BulkDeleteResponseData>(data));
  }
}
