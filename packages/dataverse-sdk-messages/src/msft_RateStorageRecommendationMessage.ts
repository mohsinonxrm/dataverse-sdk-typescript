import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msft_RateStorageRecommendation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_RateStorageRecommendationRequestParameters {
  EntityStorageProfileId: string;
  IsLike: boolean;
  PolicyCriterionId: string;
}

/**
 * msft_RateStorageRecommendation request message
 *
 * Web API Action: msft_RateStorageRecommendation
 */
export class msft_RateStorageRecommendationRequest
  extends OrganizationRequest
  implements Executable<msft_RateStorageRecommendationResponse>
{
  declare readonly Parameters: Readonly<msft_RateStorageRecommendationRequestParameters>;

  constructor(parameters: msft_RateStorageRecommendationRequestParameters) {
    super("msft_RateStorageRecommendation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_RateStorageRecommendation`;

    const body = requestBody({
      EntityStorageProfileId: this.Parameters.EntityStorageProfileId,
      IsLike: this.Parameters.IsLike,
      PolicyCriterionId: this.Parameters.PolicyCriterionId,
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
    // The body is the complex value, with its @odata.context
    return msft_RateStorageRecommendationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msft_RateStorageRecommendation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msft_RateStorageRecommendationResult {
  "@odata.context"?: string;
  IsSuccess: boolean;
}

/**
 * msft_RateStorageRecommendation response message
 *
 * `result` is the value the msft_RateStorageRecommendation action returns (see {@link msft_RateStorageRecommendationResult}).
 */
export class msft_RateStorageRecommendationResponse extends OrganizationResponse {
  constructor(public result: msft_RateStorageRecommendationResult) {
    super("msft_RateStorageRecommendation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msft_RateStorageRecommendationResponse {
    return new msft_RateStorageRecommendationResponse(data as msft_RateStorageRecommendationResult);
  }
}
