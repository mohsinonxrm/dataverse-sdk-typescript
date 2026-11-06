import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgents_GetRefreshFrequency action
 */
export interface msdyn_SalesAgents_GetRefreshFrequencyResponse {
  IsRefreshEnabled: boolean;
  RefreshFrequencyInDays: number;
}

/**
 * Parameters of the msdyn_SalesAgents_GetRefreshFrequency action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetRefreshFrequencyActionParameters {
  ProfileId: string;
}

/**
 * msdyn_SalesAgents_GetRefreshFrequency action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_GetRefreshFrequencyAction implements Executable<msdyn_SalesAgents_GetRefreshFrequencyResponse> {
  constructor(public readonly parameters: msdyn_SalesAgents_GetRefreshFrequencyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetRefreshFrequency`;

    const body = requestBody({
      ProfileId: this.parameters.ProfileId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_GetRefreshFrequencyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAgents_GetRefreshFrequencyResponse;
    return (await response.json()) as msdyn_SalesAgents_GetRefreshFrequencyResponse;
  }
}
