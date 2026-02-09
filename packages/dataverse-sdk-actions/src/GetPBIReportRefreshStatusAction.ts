import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetPBIReportRefreshStatus action
 */
export interface GetPBIReportRefreshStatusResponse {
  ReportRefreshStatusState: string;
  ReportRefreshStatusEndTime: string;
  ReportRefreshStatusStartTime: string;
}

/**
 * GetPBIReportRefreshStatus action
 *
 * Unbound action
 */
export class GetPBIReportRefreshStatusAction implements Executable<GetPBIReportRefreshStatusResponse> {
  constructor(public readonly reportId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetPBIReportRefreshStatus`;

    const body: Record<string, unknown> = {
      ReportId: this.reportId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GetPBIReportRefreshStatusResponse> {
    const data = await response.json();
    return data as GetPBIReportRefreshStatusResponse;
  }
}
