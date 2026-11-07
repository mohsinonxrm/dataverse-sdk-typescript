import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the DownloadReportDefinition function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DownloadReportDefinitionResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as DownloadReportDefinitionResponse;
  }
}
