import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AISummarizeRecord action
 */
export interface AISummarizeRecordResponse {
  SummarizedText: string;
}

/**
 * AISummarizeRecord action
 *
 * Unbound action
 */
export class AISummarizeRecordAction implements Executable<AISummarizeRecordResponse> {
  constructor(
    public readonly id: string,
    public readonly entityLogicalName: string,
    public readonly recordContext?: string,
    public readonly isMergedCatchupAndSummary?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISummarizeRecord`;

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

  async parseResponse(response: Response): Promise<AISummarizeRecordResponse> {
    const data = await response.json();
    return data as AISummarizeRecordResponse;
  }
}
