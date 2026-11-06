import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_GetSimulationEligibility action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSimulationEligibilityResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetSimulationEligibilityResponse;
  }
}
