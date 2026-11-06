import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_RAAgent_GetRecommendationAgentConfigResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RAAgent_GetRecommendationAgentConfig action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RAAgent_GetRecommendationAgentConfigResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_RAAgent_GetRecommendationAgentConfig response message
 *
 * `result` is the value the msdyn_RAAgent_GetRecommendationAgentConfig action returns (see {@link msdyn_RAAgent_GetRecommendationAgentConfigResult}).
 */
export class msdyn_RAAgent_GetRecommendationAgentConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_RAAgent_GetRecommendationAgentConfigResult) {
    super("msdyn_RAAgent_GetRecommendationAgentConfig");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RAAgent_GetRecommendationAgentConfigResponse {
    return new msdyn_RAAgent_GetRecommendationAgentConfigResponse(
      data as msdyn_RAAgent_GetRecommendationAgentConfigResult
    );
  }
}
