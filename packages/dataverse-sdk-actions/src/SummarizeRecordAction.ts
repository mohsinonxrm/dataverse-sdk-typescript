import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SummarizeRecord action
 */
export interface SummarizeRecordResponse {
  SummarizedText: string;
}

/**
 * Parameters of the SummarizeRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SummarizeRecordActionParameters {
  Id: string;
  EntityLogicalName: string;
  RecordContext?: string;
  IsMergedCatchupAndSummary?: boolean;
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

  async parseResponse(response: Response): Promise<SummarizeRecordResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SummarizeRecordResponse;
    return (await response.json()) as SummarizeRecordResponse;
  }
}
