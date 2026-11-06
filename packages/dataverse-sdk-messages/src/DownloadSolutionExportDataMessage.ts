import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { DownloadSolutionExportDataResponse as DownloadSolutionExportDataResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DownloadSolutionExportDataResponse> {
    const data = await response.json();
    return DownloadSolutionExportDataResponse.fromResponse(data);
  }
}

/**
 * DownloadSolutionExportData response message
 */
export class DownloadSolutionExportDataResponse extends OrganizationResponse {
  constructor(public result: DownloadSolutionExportDataResponseData) {
    super("DownloadSolutionExportData");
  }

  static fromResponse(data: unknown): DownloadSolutionExportDataResponse {
    return new DownloadSolutionExportDataResponse(
      responseObject<DownloadSolutionExportDataResponseData>(data)
    );
  }
}
