import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { PBIAutoRefreshDatasetResponse as PBIAutoRefreshDatasetResponseData } from "./types/index.js";

/**
 * PBIAutoRefreshDataset request message
 *
 * Web API Action: PBIAutoRefreshDataset
 */
export class PBIAutoRefreshDatasetRequest
  extends OrganizationRequest
  implements Executable<PBIAutoRefreshDatasetResponse>
{
  constructor(
    public reportId: string,
    public autoRefreshParameters: string
  ) {
    super("PBIAutoRefreshDataset");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PBIAutoRefreshDataset`;

    const body: Record<string, unknown> = {
      ReportId: this.reportId,
      AutoRefreshParameters: this.autoRefreshParameters,
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

  async parseResponse(response: Response): Promise<PBIAutoRefreshDatasetResponse> {
    const data = await response.json();
    return PBIAutoRefreshDatasetResponse.fromResponse(data);
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
