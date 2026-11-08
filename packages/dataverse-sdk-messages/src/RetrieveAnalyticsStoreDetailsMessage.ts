import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { AnalyticsStoreDetails } from "./types/index.js";

/**
 * RetrieveAnalyticsStoreDetails request message
 *
 * Web API Function: RetrieveAnalyticsStoreDetails
 */
export class RetrieveAnalyticsStoreDetailsRequest
  extends OrganizationRequest
  implements Executable<RetrieveAnalyticsStoreDetailsResponse>
{
  constructor() {
    super("RetrieveAnalyticsStoreDetails");
  }

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
    return RetrieveAnalyticsStoreDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAnalyticsStoreDetails function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAnalyticsStoreDetailsResult {
  "@odata.context"?: string;
  AnalyticsStoreDetails: AnalyticsStoreDetails;
}

/**
 * RetrieveAnalyticsStoreDetails response message
 *
 * `result` is the value the RetrieveAnalyticsStoreDetails function returns (see {@link RetrieveAnalyticsStoreDetailsResult}).
 */
export class RetrieveAnalyticsStoreDetailsResponse extends OrganizationResponse {
  constructor(public result: RetrieveAnalyticsStoreDetailsResult) {
    super("RetrieveAnalyticsStoreDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAnalyticsStoreDetailsResponse {
    return new RetrieveAnalyticsStoreDetailsResponse(data as RetrieveAnalyticsStoreDetailsResult);
  }
}
