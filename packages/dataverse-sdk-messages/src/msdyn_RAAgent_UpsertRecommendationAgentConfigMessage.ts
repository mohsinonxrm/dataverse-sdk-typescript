import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RAAgent_UpsertRecommendationAgentConfigResponse as msdyn_RAAgent_UpsertRecommendationAgentConfigResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RAAgent_UpsertRecommendationAgentConfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RAAgent_UpsertRecommendationAgentConfigRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_RAAgent_UpsertRecommendationAgentConfig request message
 *
 * Web API Action: msdyn_RAAgent_UpsertRecommendationAgentConfig
 */
export class msdyn_RAAgent_UpsertRecommendationAgentConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_RAAgent_UpsertRecommendationAgentConfigResponse>
{
  declare readonly Parameters: Readonly<msdyn_RAAgent_UpsertRecommendationAgentConfigRequestParameters>;

  constructor(parameters: msdyn_RAAgent_UpsertRecommendationAgentConfigRequestParameters) {
    super("msdyn_RAAgent_UpsertRecommendationAgentConfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RAAgent_UpsertRecommendationAgentConfig`;

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
  ): Promise<msdyn_RAAgent_UpsertRecommendationAgentConfigResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_RAAgent_UpsertRecommendationAgentConfigResponse.fromResponse({});
    return msdyn_RAAgent_UpsertRecommendationAgentConfigResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_RAAgent_UpsertRecommendationAgentConfig response message
 */
export class msdyn_RAAgent_UpsertRecommendationAgentConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_RAAgent_UpsertRecommendationAgentConfigResponseData) {
    super("msdyn_RAAgent_UpsertRecommendationAgentConfig");
  }

  static fromResponse(data: unknown): msdyn_RAAgent_UpsertRecommendationAgentConfigResponse {
    return new msdyn_RAAgent_UpsertRecommendationAgentConfigResponse(
      responseObject<msdyn_RAAgent_UpsertRecommendationAgentConfigResponseData>(data)
    );
  }
}
