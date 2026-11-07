import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msft_DismissStorageRecommendation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msft_DismissStorageRecommendationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msft_DismissStorageRecommendationResponse;
  }
}
