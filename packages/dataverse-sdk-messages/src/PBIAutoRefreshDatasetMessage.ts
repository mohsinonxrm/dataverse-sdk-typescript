import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return PBIAutoRefreshDatasetResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PBIAutoRefreshDataset action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PBIAutoRefreshDatasetResult {
  "@odata.context"?: string;
  HttpResponse: string;
}

/**
 * PBIAutoRefreshDataset response message
 *
 * `result` is the value the PBIAutoRefreshDataset action returns (see {@link PBIAutoRefreshDatasetResult}).
 */
export class PBIAutoRefreshDatasetResponse extends OrganizationResponse {
  constructor(public result: PBIAutoRefreshDatasetResult) {
    super("PBIAutoRefreshDataset");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PBIAutoRefreshDatasetResponse {
    return new PBIAutoRefreshDatasetResponse(data as PBIAutoRefreshDatasetResult);
  }
}
