import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI action
 */
export interface msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIActionParameters {
  ClientContext: string;
}

/**
 * msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI action
 *
 * Unbound action
 */
export class msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIAction implements Executable<msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse> {
  constructor(
    public readonly parameters: msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPI`;

    const body = requestBody({
      ClientContext: this.parameters.ClientContext,
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
      return {} as msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse;
    return (await response.json()) as msdyn_RAAgent_RecommendedActionsAiInsightCardDiscoveryAPIResponse;
  }
}
