import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { DownloadSolutionExportDataResponse as DownloadSolutionExportDataResponseData } from "./types/index.js";

/**
 * Parameters of the DownloadSolutionExportData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DownloadSolutionExportDataRequestParameters {
  ExportJobId: string;
}

/**
 * DownloadSolutionExportData request message
 *
 * Web API Action: DownloadSolutionExportData
 */
export class DownloadSolutionExportDataRequest
  extends OrganizationRequest
  implements Executable<DownloadSolutionExportDataResponse>
{
  declare readonly Parameters: Readonly<DownloadSolutionExportDataRequestParameters>;

  constructor(parameters: DownloadSolutionExportDataRequestParameters) {
    super("DownloadSolutionExportData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DownloadSolutionExportData`;

    const body = requestBody({
      ExportJobId: this.Parameters.ExportJobId,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return DownloadSolutionExportDataResponse.fromResponse(text ? JSON.parse(text) : {});
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
