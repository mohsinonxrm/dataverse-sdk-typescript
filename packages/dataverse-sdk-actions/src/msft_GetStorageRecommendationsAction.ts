import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msft_GetStorageRecommendations action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msft_GetStorageRecommendationsResponse {
  "@odata.context"?: string;
  CleanupOpportunityByEntity: string;
  Recommendations: string;
  TotalCleanupOpportunity: number;
}

/**
 * Parameters of the msft_GetStorageRecommendations action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_GetStorageRecommendationsActionParameters {
  EntityLogicalNames?: string[];
}

/**
 * msft_GetStorageRecommendations action
 *
 * Unbound action
 */
export class msft_GetStorageRecommendationsAction implements Executable<msft_GetStorageRecommendationsResponse> {
  constructor(public readonly parameters: msft_GetStorageRecommendationsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_GetStorageRecommendations`;

    const body = requestBody({
      EntityLogicalNames: this.parameters.EntityLogicalNames,
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
    return (await response.json()) as msft_GetStorageRecommendationsResponse;
  }
}
