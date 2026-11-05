import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DownloadSolutionExportData action
 */
export interface DownloadSolutionExportDataResponse {
  ExportSolutionFile: string;
}

/**
 * DownloadSolutionExportData action
 *
 * Unbound action
 */
export class DownloadSolutionExportDataAction implements Executable<DownloadSolutionExportDataResponse> {
  constructor(public readonly exportJobId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DownloadSolutionExportData`;

    const body: Record<string, unknown> = {
      ExportJobId: this.exportJobId,
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

  async parseResponse(response: Response): Promise<DownloadSolutionExportDataResponse> {
    const data = await response.json();
    return data as DownloadSolutionExportDataResponse;
  }
}
