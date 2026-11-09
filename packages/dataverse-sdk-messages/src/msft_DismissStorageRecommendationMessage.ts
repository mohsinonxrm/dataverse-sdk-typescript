import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msft_DismissStorageRecommendationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msft_DismissStorageRecommendation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msft_DismissStorageRecommendationResult {
  "@odata.context"?: string;
  IsSuccess: boolean;
}

/**
 * msft_DismissStorageRecommendation response message
 *
 * `result` is the value the msft_DismissStorageRecommendation action returns (see {@link msft_DismissStorageRecommendationResult}).
 */
export class msft_DismissStorageRecommendationResponse extends OrganizationResponse {
  constructor(public result: msft_DismissStorageRecommendationResult) {
    super("msft_DismissStorageRecommendation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msft_DismissStorageRecommendationResponse {
    return new msft_DismissStorageRecommendationResponse(
      data as msft_DismissStorageRecommendationResult
    );
  }
}
