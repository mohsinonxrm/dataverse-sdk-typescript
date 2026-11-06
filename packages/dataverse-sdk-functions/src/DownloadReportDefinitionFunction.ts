import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DownloadReportDefinition function
 */
export interface DownloadReportDefinitionResponse {
  BodyText: string;
}

/**
 * DownloadReportDefinition function
 *
 * Bound function
 * Binding parameter: entity (mscrm.report)
 *
 * The first argument is the id of the report record to call it on.
 */
export class DownloadReportDefinitionFunction implements Executable<DownloadReportDefinitionResponse> {
  constructor(public readonly reportId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/reports(${this.reportId})/Microsoft.Dynamics.CRM.DownloadReportDefinition`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<DownloadReportDefinitionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as DownloadReportDefinitionResponse;
    return (await response.json()) as DownloadReportDefinitionResponse;
  }
}
