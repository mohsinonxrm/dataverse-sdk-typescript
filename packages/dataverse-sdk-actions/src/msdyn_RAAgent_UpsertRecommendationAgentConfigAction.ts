import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RAAgent_UpsertRecommendationAgentConfig action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RAAgent_UpsertRecommendationAgentConfigResponse {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_RAAgent_UpsertRecommendationAgentConfig action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RAAgent_UpsertRecommendationAgentConfigActionParameters {
  RequestJson: string;
}

/**
 * msdyn_RAAgent_UpsertRecommendationAgentConfig action
 *
 * Unbound action
 */
export class msdyn_RAAgent_UpsertRecommendationAgentConfigAction implements Executable<msdyn_RAAgent_UpsertRecommendationAgentConfigResponse> {
  constructor(
    public readonly parameters: msdyn_RAAgent_UpsertRecommendationAgentConfigActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RAAgent_UpsertRecommendationAgentConfig`;

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
  ): Promise<msdyn_RAAgent_UpsertRecommendationAgentConfigResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RAAgent_UpsertRecommendationAgentConfigResponse;
  }
}
