import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { PBIAutoRefreshDatasetResponse as PBIAutoRefreshDatasetResponseData } from "./types/index.js";

/**
 * Parameters of the PBIAutoRefreshDataset message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PBIAutoRefreshDatasetRequestParameters {
  ReportId: string;
  AutoRefreshParameters: string;
}

/**
 * PBIAutoRefreshDataset request message
 *
 * Web API Action: PBIAutoRefreshDataset
 */
export class PBIAutoRefreshDatasetRequest
  extends OrganizationRequest
  implements Executable<PBIAutoRefreshDatasetResponse>
{
  declare readonly Parameters: Readonly<PBIAutoRefreshDatasetRequestParameters>;

  constructor(parameters: PBIAutoRefreshDatasetRequestParameters) {
    super("PBIAutoRefreshDataset", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PBIAutoRefreshDataset`;

    const body = requestBody({
      ReportId: this.Parameters.ReportId,
      AutoRefreshParameters: this.Parameters.AutoRefreshParameters,
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

  async parseResponse(response: Response): Promise<PBIAutoRefreshDatasetResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return PBIAutoRefreshDatasetResponse.fromResponse({});
    return PBIAutoRefreshDatasetResponse.fromResponse(await response.json());
  }
}

/**
 * PBIAutoRefreshDataset response message
 */
export class PBIAutoRefreshDatasetResponse extends OrganizationResponse {
  constructor(public result: PBIAutoRefreshDatasetResponseData) {
    super("PBIAutoRefreshDataset");
  }

  static fromResponse(data: unknown): PBIAutoRefreshDatasetResponse {
    return new PBIAutoRefreshDatasetResponse(
      responseObject<PBIAutoRefreshDatasetResponseData>(data)
    );
  }
}
