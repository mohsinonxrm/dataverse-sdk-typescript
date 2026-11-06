import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AnalyticsStoreDetails } from "./types/index.js";

/**
 * Response from RetrieveAnalyticsStoreDetails function
 */
export interface RetrieveAnalyticsStoreDetailsResponse {
  AnalyticsStoreDetails: AnalyticsStoreDetails;
}

/**
 * RetrieveAnalyticsStoreDetails function
 *
 * Unbound function
 */
export class RetrieveAnalyticsStoreDetailsFunction implements Executable<RetrieveAnalyticsStoreDetailsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAnalyticsStoreDetails`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveAnalyticsStoreDetailsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveAnalyticsStoreDetailsResponse;
  }
}
