import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PBIAutoRefreshDataset action
 */
export interface PBIAutoRefreshDatasetResponse {
  HttpResponse: string;
}

/**
 * PBIAutoRefreshDataset action
 *
 * Unbound action
 */
export class PBIAutoRefreshDatasetAction implements Executable<PBIAutoRefreshDatasetResponse> {
  constructor(
    public readonly reportId: string,
    public readonly autoRefreshParameters: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PBIAutoRefreshDataset`;

    const body: Record<string, unknown> = {
      ReportId: this.reportId,
      AutoRefreshParameters: this.autoRefreshParameters,
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

  async parseResponse(response: Response): Promise<PBIAutoRefreshDatasetResponse> {
    const data = await response.json();
    return data as PBIAutoRefreshDatasetResponse;
  }
}
