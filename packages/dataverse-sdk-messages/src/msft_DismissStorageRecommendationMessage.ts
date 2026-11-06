import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msft_DismissStorageRecommendationResponse as msft_DismissStorageRecommendationResponseData } from "./types/index.js";

/**
 * Parameters of the msft_DismissStorageRecommendation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_DismissStorageRecommendationRequestParameters {
  PolicyCriterionId: string;
  EntityStorageProfileId: string;
}

/**
 * msft_DismissStorageRecommendation request message
 *
 * Web API Action: msft_DismissStorageRecommendation
 */
export class msft_DismissStorageRecommendationRequest
  extends OrganizationRequest
  implements Executable<msft_DismissStorageRecommendationResponse>
{
  declare readonly Parameters: Readonly<msft_DismissStorageRecommendationRequestParameters>;

  constructor(parameters: msft_DismissStorageRecommendationRequestParameters) {
    super("msft_DismissStorageRecommendation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_DismissStorageRecommendation`;

    const body = requestBody({
      PolicyCriterionId: this.Parameters.PolicyCriterionId,
      EntityStorageProfileId: this.Parameters.EntityStorageProfileId,
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
    if (response.status === 204) return msft_DismissStorageRecommendationResponse.fromResponse({});
    return msft_DismissStorageRecommendationResponse.fromResponse(await response.json());
  }
}

/**
 * msft_DismissStorageRecommendation response message
 */
export class msft_DismissStorageRecommendationResponse extends OrganizationResponse {
  constructor(public result: msft_DismissStorageRecommendationResponseData) {
    super("msft_DismissStorageRecommendation");
  }

  static fromResponse(data: unknown): msft_DismissStorageRecommendationResponse {
    return new msft_DismissStorageRecommendationResponse(
      responseObject<msft_DismissStorageRecommendationResponseData>(data)
    );
  }
}
