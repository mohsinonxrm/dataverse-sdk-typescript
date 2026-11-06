import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_setupsimulation action
 */
export interface msdyn_setupsimulationResponse {
  message: string;
  statuscode: number;
}

/**
 * msdyn_setupsimulation action
 *
 * Unbound action
 */
export class msdyn_setupsimulationAction implements Executable<msdyn_setupsimulationResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_setupsimulation`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_setupsimulationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_setupsimulationResponse;
    return (await response.json()) as msdyn_setupsimulationResponse;
  }
}
