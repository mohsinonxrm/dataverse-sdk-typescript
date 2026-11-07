import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RAAgent_GetRecommendationAgentConfig action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RAAgent_GetRecommendationAgentConfigResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RAAgent_GetRecommendationAgentConfigResponse;
  }
}
