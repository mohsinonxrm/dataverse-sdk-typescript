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
 *
 * The first argument is the id of the report record to call it on.
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as GetReportHistoryLimitResponse;
  }
}
