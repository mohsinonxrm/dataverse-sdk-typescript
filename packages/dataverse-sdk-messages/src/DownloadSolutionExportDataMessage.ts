import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DownloadSolutionExportData request message
 *
 * Web API Action: DownloadSolutionExportData
 */
export class DownloadSolutionExportDataRequest
  extends OrganizationRequest
  implements Executable<DownloadSolutionExportDataResponse>
{
  constructor(public exportJobId: string) {
    super("DownloadSolutionExportData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DownloadSolutionExportData`;

    const body: Record<string, unknown> = {
      ExportJobId: this.exportJobId,
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

  async parseResponse(response: Response): Promise<DownloadSolutionExportDataResponse> {
    const data = await response.json();
    return DownloadSolutionExportDataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ExportJobId: this.exportJobId,
    };
  }
}

/**
 * DownloadSolutionExportData response message
 */
export class DownloadSolutionExportDataResponse extends OrganizationResponse {
  constructor(public result: DownloadSolutionExportDataResponse) {
    super("DownloadSolutionExportData");
  }

  static fromResponse(data: unknown): DownloadSolutionExportDataResponse {
    return new DownloadSolutionExportDataResponse((data as any).value);
  }
}
