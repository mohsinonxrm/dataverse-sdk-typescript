import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msft_GetSecHubFeatureDataResponse> {
    const data = await response.json();
    return msft_GetSecHubFeatureDataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msft_GetSecHubFeatureData response message
 */
export class msft_GetSecHubFeatureDataResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msft_GetSecHubFeatureData");
  }

  static fromResponse(data: unknown): msft_GetSecHubFeatureDataResponse {
    return new msft_GetSecHubFeatureDataResponse((data as any).value);
  }
}
