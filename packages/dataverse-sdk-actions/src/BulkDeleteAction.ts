import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { QueryExpression, activityparty } from "./types/index.js";

/**
 * Response from BulkDelete action
 */
export interface BulkDeleteResponse {
  JobId: string;
}

/**
 * Parameters of the BulkDelete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BulkDeleteActionParameters {
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
 * BulkDelete action
 *
 * Unbound action
 */
export class BulkDeleteAction implements Executable<BulkDeleteResponse> {
  constructor(public readonly parameters: BulkDeleteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkDelete`;

    const body = requestBody({
      QuerySet: enumBody(this.parameters.QuerySet, "QueryExpression"),
      JobName: this.parameters.JobName,
      SendEmailNotification: this.parameters.SendEmailNotification,
      ToRecipients: this.parameters.ToRecipients,
      CCRecipients: this.parameters.CCRecipients,
      RecurrencePattern: this.parameters.RecurrencePattern,
      StartDateTime: this.parameters.StartDateTime,
      SourceImportId: this.parameters.SourceImportId,
      RunNow: this.parameters.RunNow,
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
    if (response.status === 204) return {} as BulkDeleteResponse;
    return (await response.json()) as BulkDeleteResponse;
  }
}
