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
    const data = await response.json();
    return data as DownloadReportDefinitionResponse;
  }
}
