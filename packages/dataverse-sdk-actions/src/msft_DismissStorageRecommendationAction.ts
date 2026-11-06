import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msft_DismissStorageRecommendation action
 */
export interface msft_DismissStorageRecommendationResponse {
  IsSuccess: boolean;
}

/**
 * Parameters of the msft_DismissStorageRecommendation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_DismissStorageRecommendationActionParameters {
  PolicyCriterionId: string;
  EntityStorageProfileId: string;
}

/**
 * msft_DismissStorageRecommendation action
 *
 * Unbound action
 */
export class msft_DismissStorageRecommendationAction implements Executable<msft_DismissStorageRecommendationResponse> {
  constructor(public readonly parameters: msft_DismissStorageRecommendationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_DismissStorageRecommendation`;

    const body = requestBody({
      PolicyCriterionId: this.parameters.PolicyCriterionId,
      EntityStorageProfileId: this.parameters.EntityStorageProfileId,
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

  async parseResponse(response: Response): Promise<msft_DismissStorageRecommendationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msft_DismissStorageRecommendationResponse;
    return (await response.json()) as msft_DismissStorageRecommendationResponse;
  }
}
