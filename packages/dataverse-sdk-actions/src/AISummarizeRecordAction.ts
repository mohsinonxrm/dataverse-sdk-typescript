import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AISummarizeRecord action
 */
export interface AISummarizeRecordResponse {
  SummarizedText: string;
}

/**
 * Parameters of the AISummarizeRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AISummarizeRecordActionParameters {
  Id: string;
  EntityLogicalName: string;
  RecordContext?: string;
  IsMergedCatchupAndSummary?: boolean;
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
      Id: this.parameters.Id,
      EntityLogicalName: this.parameters.EntityLogicalName,
      RecordContext: this.parameters.RecordContext,
      IsMergedCatchupAndSummary: this.parameters.IsMergedCatchupAndSummary,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as AISummarizeRecordResponse;
    return (await response.json()) as AISummarizeRecordResponse;
  }
}
