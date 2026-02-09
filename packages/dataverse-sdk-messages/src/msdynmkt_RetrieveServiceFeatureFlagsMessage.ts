import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_RetrieveServiceFeatureFlags request message
 *
 * Web API Action: msdynmkt_RetrieveServiceFeatureFlags
 */
export class msdynmkt_RetrieveServiceFeatureFlagsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_RetrieveServiceFeatureFlagsResponse>
{
  constructor(public serviceName: string) {
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_RetrieveServiceFeatureFlagsResponse> {
    const data = await response.json();
    return msdynmkt_RetrieveServiceFeatureFlagsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ServiceName: this.serviceName,
    };
  }
}

/**
 * msdynmkt_RetrieveServiceFeatureFlags response message
 */
export class msdynmkt_RetrieveServiceFeatureFlagsResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_RetrieveServiceFeatureFlagsResponse) {
    super("msdynmkt_RetrieveServiceFeatureFlags");
  }

  static fromResponse(data: unknown): msdynmkt_RetrieveServiceFeatureFlagsResponse {
    return new msdynmkt_RetrieveServiceFeatureFlagsResponse((data as any).value);
  }
}
