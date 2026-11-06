import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateResourceOptimizationRequest action
 */
export interface msdyn_CreateResourceOptimizationRequestResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_CreateResourceOptimizationRequest action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateResourceOptimizationRequestActionParameters {
  ResourceIds: string;
  StartDate: string;
  EndDate: string;
  GoalId?: string;
  IsSimulation?: boolean;
  OptimizationRequestId?: string;
}

/**
 * msdyn_CreateResourceOptimizationRequest action
 *
 * Unbound action
 */
export class msdyn_CreateResourceOptimizationRequestAction implements Executable<msdyn_CreateResourceOptimizationRequestResponse> {
  constructor(
    public readonly parameters: msdyn_CreateResourceOptimizationRequestActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateResourceOptimizationRequest`;

    const body = requestBody({
      ResourceIds: this.parameters.ResourceIds,
      StartDate: this.parameters.StartDate,
      EndDate: this.parameters.EndDate,
      GoalId: this.parameters.GoalId,
      IsSimulation: this.parameters.IsSimulation,
      OptimizationRequestId: this.parameters.OptimizationRequestId,
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
  ): Promise<msdyn_CreateResourceOptimizationRequestResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateResourceOptimizationRequestResponse;
    return (await response.json()) as msdyn_CreateResourceOptimizationRequestResponse;
  }
}
