import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
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
 * Parameters of the BulkDetectDuplicates action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BulkDetectDuplicatesActionParameters {
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
 * BulkDetectDuplicates action
 *
 * Unbound action
 */
export class BulkDetectDuplicatesAction implements Executable<BulkDetectDuplicatesResponse> {
  constructor(public readonly parameters: BulkDetectDuplicatesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BulkDetectDuplicates`;

    const body = requestBody({
      Query: enumBody(this.parameters.Query, "QueryBase"),
      JobName: this.parameters.JobName,
      SendEmailNotification: this.parameters.SendEmailNotification,
      TemplateId: this.parameters.TemplateId,
      ToRecipients: this.parameters.ToRecipients,
      CCRecipients: this.parameters.CCRecipients,
      RecurrencePattern: this.parameters.RecurrencePattern,
      RecurrenceStartTime: this.parameters.RecurrenceStartTime,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as BulkDetectDuplicatesResponse;
    return (await response.json()) as BulkDetectDuplicatesResponse;
  }
}
