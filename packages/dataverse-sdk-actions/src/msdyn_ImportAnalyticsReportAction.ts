import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ImportAnalyticsReport action
 */
export interface msdyn_ImportAnalyticsReportResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ImportAnalyticsReport action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ImportAnalyticsReportActionParameters {
  msdyn_OverwriteDraft?: boolean;
  msdyn_AnalyticsReportContent: string;
  msdyn_AnalyticsFeatureId: string;
}

/**
 * msdyn_ImportAnalyticsReport action
 *
 * Unbound action
 */
export class msdyn_ImportAnalyticsReportAction implements Executable<msdyn_ImportAnalyticsReportResponse> {
  constructor(public readonly parameters: msdyn_ImportAnalyticsReportActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ImportAnalyticsReport`;

    const body = requestBody({
      msdyn_OverwriteDraft: this.parameters.msdyn_OverwriteDraft,
      msdyn_AnalyticsReportContent: this.parameters.msdyn_AnalyticsReportContent,
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

  async parseResponse(response: Response): Promise<msdyn_ImportAnalyticsReportResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ImportAnalyticsReportResponse;
    return (await response.json()) as msdyn_ImportAnalyticsReportResponse;
  }
}
