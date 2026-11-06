import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msft_RateStorageRecommendationResponse as msft_RateStorageRecommendationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msft_RateStorageRecommendationResponse.fromResponse({});
    return msft_RateStorageRecommendationResponse.fromResponse(await response.json());
  }
}

/**
 * msft_RateStorageRecommendation response message
 */
export class msft_RateStorageRecommendationResponse extends OrganizationResponse {
  constructor(public result: msft_RateStorageRecommendationResponseData) {
    super("msft_RateStorageRecommendation");
  }

  static fromResponse(data: unknown): msft_RateStorageRecommendationResponse {
    return new msft_RateStorageRecommendationResponse(
      responseObject<msft_RateStorageRecommendationResponseData>(data)
    );
  }
}
