import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RAAgent_GetRecommendationAgentConfigResponse as msdyn_RAAgent_GetRecommendationAgentConfigResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RAAgent_GetRecommendationAgentConfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RAAgent_GetRecommendationAgentConfigRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_RAAgent_GetRecommendationAgentConfig request message
 *
 * Web API Action: msdyn_RAAgent_GetRecommendationAgentConfig
 */
export class msdyn_RAAgent_GetRecommendationAgentConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_RAAgent_GetRecommendationAgentConfigResponse>
{
  declare readonly Parameters: Readonly<msdyn_RAAgent_GetRecommendationAgentConfigRequestParameters>;

  constructor(parameters: msdyn_RAAgent_GetRecommendationAgentConfigRequestParameters) {
    super("msdyn_RAAgent_GetRecommendationAgentConfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RAAgent_GetRecommendationAgentConfig`;

    const body = requestBody({
      RequestJson: this.Parameters.RequestJson,
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
  ): Promise<msdyn_RAAgent_GetRecommendationAgentConfigResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_RAAgent_GetRecommendationAgentConfigResponse.fromResponse({});
    return msdyn_RAAgent_GetRecommendationAgentConfigResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RAAgent_GetRecommendationAgentConfig response message
 */
export class msdyn_RAAgent_GetRecommendationAgentConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_RAAgent_GetRecommendationAgentConfigResponseData) {
    super("msdyn_RAAgent_GetRecommendationAgentConfig");
  }

  static fromResponse(data: unknown): msdyn_RAAgent_GetRecommendationAgentConfigResponse {
    return new msdyn_RAAgent_GetRecommendationAgentConfigResponse(
      responseObject<msdyn_RAAgent_GetRecommendationAgentConfigResponseData>(data)
    );
  }
}
