import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_RetrieveServiceFeatureFlagsResponse as msdynmkt_RetrieveServiceFeatureFlagsResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_RetrieveServiceFeatureFlags message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_RetrieveServiceFeatureFlagsRequestParameters {
  ServiceName?: string;
}

/**
 * msdynmkt_RetrieveServiceFeatureFlags request message
 *
 * Web API Action: msdynmkt_RetrieveServiceFeatureFlags
 */
export class msdynmkt_RetrieveServiceFeatureFlagsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_RetrieveServiceFeatureFlagsResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_RetrieveServiceFeatureFlagsRequestParameters>;

  constructor(parameters: msdynmkt_RetrieveServiceFeatureFlagsRequestParameters = {}) {
    super("msdynmkt_RetrieveServiceFeatureFlags", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveServiceFeatureFlags`;

    const body = requestBody({
      ServiceName: this.Parameters.ServiceName,
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

  async parseResponse(response: Response): Promise<msdynmkt_RetrieveServiceFeatureFlagsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_RetrieveServiceFeatureFlagsResponse.fromResponse({});
    return msdynmkt_RetrieveServiceFeatureFlagsResponse.fromResponse(await response.json());
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
