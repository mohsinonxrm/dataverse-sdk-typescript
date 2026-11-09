import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AISummarizeRecord action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AISummarizeRecordResponse {
  "@odata.context"?: string;
  SummarizedText: string;
}

/**
 * Parameters of the AISummarizeRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AISummarizeRecordActionParameters {
  RecordContext?: string;
  IsMergedCatchupAndSummary?: boolean;
  EntityLogicalName: string;
  Id: string;
}

/**
 * AISummarizeRecord action
 *
 * Unbound action
 */
export class AISummarizeRecordAction implements Executable<AISummarizeRecordResponse> {
  constructor(public readonly parameters: AISummarizeRecordActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISummarizeRecord`;

    const body = requestBody({
      RecordContext: this.parameters.RecordContext,
      IsMergedCatchupAndSummary: this.parameters.IsMergedCatchupAndSummary,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Id: this.parameters.Id,
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

  async parseResponse(response: Response): Promise<AISummarizeRecordResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AISummarizeRecordResponse;
  }
}
