import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_simulationratelimiter action
 */
export interface msdyn_simulationratelimiterResponse {
  message: string;
  statuscode: number;
}

/**
 * Parameters of the msdyn_simulationratelimiter action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_simulationratelimiterActionParameters {
  ConversationCount: number;
}

/**
 * msdyn_simulationratelimiter action
 *
 * Unbound action
 */
export class msdyn_simulationratelimiterAction implements Executable<msdyn_simulationratelimiterResponse> {
  constructor(public readonly parameters: msdyn_simulationratelimiterActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_simulationratelimiter`;

    const body = requestBody({
      ConversationCount: this.parameters.ConversationCount,
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

  async parseResponse(response: Response): Promise<msdyn_simulationratelimiterResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_simulationratelimiterResponse;
    return (await response.json()) as msdyn_simulationratelimiterResponse;
  }
}
