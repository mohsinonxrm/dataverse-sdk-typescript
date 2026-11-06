import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msft_GetStorageRecommendations action
 */
export interface msft_GetStorageRecommendationsResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msft_GetStorageRecommendationsResponse;
    return (await response.json()) as msft_GetStorageRecommendationsResponse;
  }
}
