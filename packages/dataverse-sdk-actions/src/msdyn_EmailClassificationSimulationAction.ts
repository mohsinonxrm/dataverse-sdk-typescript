import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_EmailClassificationSimulation action
 */
export interface msdyn_EmailClassificationSimulationResponse {
  msdyn_HasMoreRecords: string;
  msdyn_NeedThrottling: string;
}

/**
 * Parameters of the msdyn_EmailClassificationSimulation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailClassificationSimulationActionParameters {
  msdyn_CallerSource?: string;
  msdyn_SimulationRunId: string;
}

/**
 * msdyn_EmailClassificationSimulation action
 *
 * Unbound action
 */
export class msdyn_EmailClassificationSimulationAction implements Executable<msdyn_EmailClassificationSimulationResponse> {
  constructor(public readonly parameters: msdyn_EmailClassificationSimulationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailClassificationSimulation`;

    const body = requestBody({
      msdyn_CallerSource: this.parameters.msdyn_CallerSource,
      msdyn_SimulationRunId: this.parameters.msdyn_SimulationRunId,
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

  async parseResponse(response: Response): Promise<msdyn_EmailClassificationSimulationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_EmailClassificationSimulationResponse;
    return (await response.json()) as msdyn_EmailClassificationSimulationResponse;
  }
}
