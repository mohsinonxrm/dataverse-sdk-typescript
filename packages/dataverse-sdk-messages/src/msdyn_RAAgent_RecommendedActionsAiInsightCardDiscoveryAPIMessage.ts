import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse as msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIRequestParameters {
  ClientContext: string;
}

/**
 * msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI request message
 *
 * Web API Action: msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI
 */
export class msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse>
{
  declare readonly Parameters: Readonly<msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIRequestParameters>;

  constructor(
    parameters: msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIRequestParameters
  ) {
    super("msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI`;

    const body = requestBody({
      ClientContext: this.Parameters.ClientContext,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse.fromResponse({});
    return msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI response message
 */
export class msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponseData
  ) {
    super("msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI");
  }

  static fromResponse(
    data: unknown
  ): msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse {
    return new msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse(
      responseObject<msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponseData>(data)
    );
  }
}
