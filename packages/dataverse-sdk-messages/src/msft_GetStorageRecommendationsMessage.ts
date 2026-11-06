import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msft_GetStorageRecommendationsResponse as msft_GetStorageRecommendationsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msft_GetStorageRecommendationsResponse.fromResponse({});
    return msft_GetStorageRecommendationsResponse.fromResponse(await response.json());
  }
}

/**
 * msft_GetStorageRecommendations response message
 */
export class msft_GetStorageRecommendationsResponse extends OrganizationResponse {
  constructor(public result: msft_GetStorageRecommendationsResponseData) {
    super("msft_GetStorageRecommendations");
  }

  static fromResponse(data: unknown): msft_GetStorageRecommendationsResponse {
    return new msft_GetStorageRecommendationsResponse(
      responseObject<msft_GetStorageRecommendationsResponseData>(data)
    );
  }
}
