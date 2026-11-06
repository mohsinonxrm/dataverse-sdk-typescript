import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RAAgent_GetRecommendationAgentConfig action
 */
export interface msdyn_RAAgent_GetRecommendationAgentConfigResponse {
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_RAAgent_GetRecommendationAgentConfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RAAgent_GetRecommendationAgentConfigActionParameters {
  RequestJson: string;
}

/**
 * msdyn_RAAgent_GetRecommendationAgentConfig action
 *
 * Unbound action
 */
export class msdyn_RAAgent_GetRecommendationAgentConfigAction implements Executable<msdyn_RAAgent_GetRecommendationAgentConfigResponse> {
  constructor(
    public readonly parameters: msdyn_RAAgent_GetRecommendationAgentConfigActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RAAgent_GetRecommendationAgentConfig`;

    const body = requestBody({
      RequestJson: this.parameters.RequestJson,
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
    if (response.status === 204) return {} as msdyn_RAAgent_GetRecommendationAgentConfigResponse;
    return (await response.json()) as msdyn_RAAgent_GetRecommendationAgentConfigResponse;
  }
}
