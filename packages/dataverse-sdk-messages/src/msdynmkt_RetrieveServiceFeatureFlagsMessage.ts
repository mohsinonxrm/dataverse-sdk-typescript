import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_RetrieveServiceFeatureFlagsResponse as msdynmkt_RetrieveServiceFeatureFlagsResponseData } from "./types/index.js";

/**
 * msdynmkt_RetrieveServiceFeatureFlags request message
 *
 * Web API Action: msdynmkt_RetrieveServiceFeatureFlags
 */
export class msdynmkt_RetrieveServiceFeatureFlagsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_RetrieveServiceFeatureFlagsResponse>
{
  constructor(public serviceName?: string) {
    super("msdynmkt_RetrieveServiceFeatureFlags");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveServiceFeatureFlags`;

    const body: Record<string, unknown> = {
      ServiceName: this.serviceName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_RetrieveServiceFeatureFlagsResponse> {
    const data = await response.json();
    return msdynmkt_RetrieveServiceFeatureFlagsResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_RetrieveServiceFeatureFlags response message
 */
export class msdynmkt_RetrieveServiceFeatureFlagsResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_RetrieveServiceFeatureFlagsResponseData) {
    super("msdynmkt_RetrieveServiceFeatureFlags");
  }

  static fromResponse(data: unknown): msdynmkt_RetrieveServiceFeatureFlagsResponse {
    return new msdynmkt_RetrieveServiceFeatureFlagsResponse(
      responseObject<msdynmkt_RetrieveServiceFeatureFlagsResponseData>(data)
    );
  }
}
