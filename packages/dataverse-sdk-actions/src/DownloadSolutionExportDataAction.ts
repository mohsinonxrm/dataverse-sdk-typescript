import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DownloadSolutionExportData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DownloadSolutionExportDataResponse {
  "@odata.context"?: string;
  ExportSolutionFile: string;
}

/**
 * Parameters of the DownloadSolutionExportData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DownloadSolutionExportDataActionParameters {
  ExportJobId: string;
}

/**
 * DownloadSolutionExportData action
 *
 * Unbound action
 */
export class DownloadSolutionExportDataAction implements Executable<DownloadSolutionExportDataResponse> {
  constructor(public readonly parameters: DownloadSolutionExportDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DownloadSolutionExportData`;

    const body = requestBody({
      ExportJobId: this.parameters.ExportJobId,
    });

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as DownloadSolutionExportDataResponse;
  }
}
