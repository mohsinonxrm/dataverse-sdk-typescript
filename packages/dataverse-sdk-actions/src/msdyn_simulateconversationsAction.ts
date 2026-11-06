import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_simulateconversations action
 */
export interface msdyn_simulateconversationsResponse {
  simulationrunid: string;
}

/**
 * Parameters of the msdyn_simulateconversations action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_simulateconversationsActionParameters {
  prompt: string;
}

/**
 * msdyn_simulateconversations action
 *
 * Unbound action
 */
export class msdyn_simulateconversationsAction implements Executable<msdyn_simulateconversationsResponse> {
  constructor(public readonly parameters: msdyn_simulateconversationsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_simulateconversations`;

    const body = requestBody({
      prompt: this.parameters.prompt,
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

  async parseResponse(response: Response): Promise<msdyn_simulateconversationsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_simulateconversationsResponse;
    return (await response.json()) as msdyn_simulateconversationsResponse;
  }
}
