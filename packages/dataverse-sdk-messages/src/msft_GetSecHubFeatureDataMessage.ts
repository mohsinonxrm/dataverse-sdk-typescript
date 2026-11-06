import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msft_GetSecHubFeatureData request message
 *
 * Web API Action: msft_GetSecHubFeatureData
 */
export class msft_GetSecHubFeatureDataRequest
  extends OrganizationRequest
  implements Executable<msft_GetSecHubFeatureDataResponse>
{
  constructor() {
    super("msft_GetSecHubFeatureData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_GetSecHubFeatureData`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msft_GetSecHubFeatureDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msft_GetSecHubFeatureDataResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msft_GetSecHubFeatureData response message
 */
export class msft_GetSecHubFeatureDataResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msft_GetSecHubFeatureData");
  }

  static fromResponse(data: unknown): msft_GetSecHubFeatureDataResponse {
    return new msft_GetSecHubFeatureDataResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
