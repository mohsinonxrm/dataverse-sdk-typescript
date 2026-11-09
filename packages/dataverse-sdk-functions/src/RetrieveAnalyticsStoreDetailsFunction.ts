import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AnalyticsStoreDetails } from "./types/index.js";

/**
 * Response from the RetrieveAnalyticsStoreDetails function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAnalyticsStoreDetailsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveAnalyticsStoreDetailsResponse;
  }
}
