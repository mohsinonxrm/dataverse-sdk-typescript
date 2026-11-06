import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExportAnalyticsReport action
 */
export interface msdyn_ExportAnalyticsReportResponse {
  msdyn_AnalyticsReportContent: string;
}

/**
 * Parameters of the msdyn_ExportAnalyticsReport action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExportAnalyticsReportActionParameters {
  msdyn_AnalyticsFeatureId: string;
}

/**
 * msdyn_ExportAnalyticsReport action
 *
 * Unbound action
 */
export class msdyn_ExportAnalyticsReportAction implements Executable<msdyn_ExportAnalyticsReportResponse> {
  constructor(public readonly parameters: msdyn_ExportAnalyticsReportActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExportAnalyticsReport`;

    const body = requestBody({
      msdyn_AnalyticsFeatureId: this.parameters.msdyn_AnalyticsFeatureId,
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

  async parseResponse(response: Response): Promise<msdyn_ExportAnalyticsReportResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ExportAnalyticsReportResponse;
  }
}
