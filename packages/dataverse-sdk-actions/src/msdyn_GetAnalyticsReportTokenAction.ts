import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAnalyticsReportToken action
 */
export interface msdyn_GetAnalyticsReportTokenResponse {
  Token: string;
  Expiration: string;
}

/**
 * msdyn_GetAnalyticsReportToken action
 *
 * Unbound action
 */
export class msdyn_GetAnalyticsReportTokenAction implements Executable<msdyn_GetAnalyticsReportTokenResponse> {
  constructor(public readonly analyticsRecordId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAnalyticsReportToken`;

    const body: Record<string, unknown> = {
      AnalyticsRecordId: this.analyticsRecordId,
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

  async parseResponse(response: Response): Promise<msdyn_GetAnalyticsReportTokenResponse> {
    const data = await response.json();
    return data as msdyn_GetAnalyticsReportTokenResponse;
  }
}
