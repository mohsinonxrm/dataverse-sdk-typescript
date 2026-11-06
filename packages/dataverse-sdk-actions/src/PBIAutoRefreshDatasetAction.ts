import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the PBIAutoRefreshDataset action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PBIAutoRefreshDatasetResponse {
  "@odata.context"?: string;
  HttpResponse: string;
}

/**
 * Parameters of the PBIAutoRefreshDataset action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PBIAutoRefreshDatasetActionParameters {
  ReportId: string;
  AutoRefreshParameters: string;
}

/**
 * PBIAutoRefreshDataset action
 *
 * Unbound action
 */
export class PBIAutoRefreshDatasetAction implements Executable<PBIAutoRefreshDatasetResponse> {
  constructor(public readonly parameters: PBIAutoRefreshDatasetActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PBIAutoRefreshDataset`;

    const body = requestBody({
      ReportId: this.parameters.ReportId,
      AutoRefreshParameters: this.parameters.AutoRefreshParameters,
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
    return (await response.json()) as PBIAutoRefreshDatasetResponse;
  }
}
