import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msft_RateStorageRecommendation action
 */
export interface msft_RateStorageRecommendationResponse {
  IsSuccess: boolean;
}

/**
 * Parameters of the msft_RateStorageRecommendation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_RateStorageRecommendationActionParameters {
  EntityStorageProfileId: string;
  IsLike: boolean;
  PolicyCriterionId: string;
}

/**
 * msft_RateStorageRecommendation action
 *
 * Unbound action
 */
export class msft_RateStorageRecommendationAction implements Executable<msft_RateStorageRecommendationResponse> {
  constructor(public readonly parameters: msft_RateStorageRecommendationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_RateStorageRecommendation`;

    const body = requestBody({
      EntityStorageProfileId: this.parameters.EntityStorageProfileId,
      IsLike: this.parameters.IsLike,
      PolicyCriterionId: this.parameters.PolicyCriterionId,
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

  async parseResponse(response: Response): Promise<msft_RateStorageRecommendationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msft_RateStorageRecommendationResponse;
    return (await response.json()) as msft_RateStorageRecommendationResponse;
  }
}
