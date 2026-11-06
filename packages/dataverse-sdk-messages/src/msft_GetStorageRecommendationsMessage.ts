import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msft_GetStorageRecommendations message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_GetStorageRecommendationsRequestParameters {
  EntityLogicalNames?: string[];
}

/**
 * msft_GetStorageRecommendations request message
 *
 * Web API Action: msft_GetStorageRecommendations
 */
export class msft_GetStorageRecommendationsRequest
  extends OrganizationRequest
  implements Executable<msft_GetStorageRecommendationsResponse>
{
  declare readonly Parameters: Readonly<msft_GetStorageRecommendationsRequestParameters>;

  constructor(parameters: msft_GetStorageRecommendationsRequestParameters = {}) {
    super("msft_GetStorageRecommendations", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_GetStorageRecommendations`;

    const body = requestBody({
      EntityLogicalNames: this.Parameters.EntityLogicalNames,
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

  async parseResponse(response: Response): Promise<msft_GetStorageRecommendationsResponse> {
    // The body is the complex value, with its @odata.context
    return msft_GetStorageRecommendationsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msft_GetStorageRecommendations action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msft_GetStorageRecommendationsResult {
  "@odata.context"?: string;
  CleanupOpportunityByEntity: string;
  Recommendations: string;
  TotalCleanupOpportunity: number;
}

/**
 * msft_GetStorageRecommendations response message
 *
 * `result` is the value the msft_GetStorageRecommendations action returns (see {@link msft_GetStorageRecommendationsResult}).
 */
export class msft_GetStorageRecommendationsResponse extends OrganizationResponse {
  constructor(public result: msft_GetStorageRecommendationsResult) {
    super("msft_GetStorageRecommendations");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msft_GetStorageRecommendationsResponse {
    return new msft_GetStorageRecommendationsResponse(data as msft_GetStorageRecommendationsResult);
  }
}
