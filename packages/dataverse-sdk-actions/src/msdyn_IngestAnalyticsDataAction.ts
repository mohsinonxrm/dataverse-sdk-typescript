import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IngestAnalyticsData action
 */
export interface msdyn_IngestAnalyticsDataResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_IngestAnalyticsData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IngestAnalyticsDataActionParameters {
  IngestionRequest: string;
}

/**
 * msdyn_IngestAnalyticsData action
 *
 * Unbound action
 */
export class msdyn_IngestAnalyticsDataAction implements Executable<msdyn_IngestAnalyticsDataResponse> {
  constructor(public readonly parameters: msdyn_IngestAnalyticsDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IngestAnalyticsData`;

    const body = requestBody({
      IngestionRequest: this.parameters.IngestionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_IngestAnalyticsDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_IngestAnalyticsDataResponse;
  }
}
