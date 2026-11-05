import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SummarizeRecord action
 */
export interface SummarizeRecordResponse {
  SummarizedText: string;
}

/**
 * SummarizeRecord action
 *
 * Unbound action
 */
export class SummarizeRecordAction implements Executable<SummarizeRecordResponse> {
  constructor(
    public readonly id: string,
    public readonly entityLogicalName: string,
    public readonly recordContext: string,
    public readonly isMergedCatchupAndSummary: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SummarizeRecord`;

    const body: Record<string, unknown> = {
      Id: this.id,
      EntityLogicalName: this.entityLogicalName,
      RecordContext: this.recordContext,
      IsMergedCatchupAndSummary: this.isMergedCatchupAndSummary,
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

  async parseResponse(response: Response): Promise<SummarizeRecordResponse> {
    const data = await response.json();
    return data as SummarizeRecordResponse;
  }
}
