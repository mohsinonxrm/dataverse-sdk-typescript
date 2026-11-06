import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSimulationEligibility action
 */
export interface msdyn_GetSimulationEligibilityResponse {
  msdyn_simulationenabled: boolean;
}

/**
 * msdyn_GetSimulationEligibility action
 *
 * Unbound action
 */
export class msdyn_GetSimulationEligibilityAction implements Executable<msdyn_GetSimulationEligibilityResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSimulationEligibility`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSimulationEligibilityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetSimulationEligibilityResponse;
    return (await response.json()) as msdyn_GetSimulationEligibilityResponse;
  }
}
