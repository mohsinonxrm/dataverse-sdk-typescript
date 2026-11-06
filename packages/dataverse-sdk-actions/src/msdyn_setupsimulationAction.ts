import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_setupsimulation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_setupsimulationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_setupsimulationResponse;
  }
}
