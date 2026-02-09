import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetReportHistoryLimit function
 */
export interface GetReportHistoryLimitResponse {
  HistoryLimit: number;
}

/**
 * GetReportHistoryLimit function
 *
 * Bound function
 * Binding parameter: entity (mscrm.report)
 */
export class GetReportHistoryLimitFunction implements Executable<GetReportHistoryLimitResponse> {
  constructor(public readonly reportId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/reports(${this.reportId})/Microsoft.Dynamics.CRM.GetReportHistoryLimit`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetReportHistoryLimitResponse> {
    const data = await response.json();
    return data as GetReportHistoryLimitResponse;
  }
}
