import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SummarizeRecord action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SummarizeRecordResponse {
  "@odata.context"?: string;
  SummarizedText: string;
}

/**
 * Parameters of the SummarizeRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SummarizeRecordActionParameters {
  Id: string;
  IsMergedCatchupAndSummary?: boolean;
  RecordContext?: string;
  EntityLogicalName: string;
}

/**
 * SummarizeRecord action
 *
 * Unbound action
 */
export class SummarizeRecordAction implements Executable<SummarizeRecordResponse> {
  constructor(public readonly parameters: SummarizeRecordActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SummarizeRecord`;

    const body = requestBody({
      Id: this.parameters.Id,
      IsMergedCatchupAndSummary: this.parameters.IsMergedCatchupAndSummary,
      RecordContext: this.parameters.RecordContext,
      EntityLogicalName: this.parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<SummarizeRecordResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as SummarizeRecordResponse;
  }
}
