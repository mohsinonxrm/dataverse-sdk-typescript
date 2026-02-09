import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateResourceOptimizationRequest action
 */
export interface msdyn_CreateResourceOptimizationRequestResponse {
  // No content returned
}

/**
 * msdyn_CreateResourceOptimizationRequest action
 *
 * Unbound action
 */
export class msdyn_CreateResourceOptimizationRequestAction implements Executable<msdyn_CreateResourceOptimizationRequestResponse> {
  constructor(
    public readonly resourceIds: string,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly goalId: string,
    public readonly isSimulation: boolean,
    public readonly optimizationRequestId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateResourceOptimizationRequest`;

    const body: Record<string, unknown> = {
      ResourceIds: this.resourceIds,
      StartDate: this.startDate,
      EndDate: this.endDate,
      GoalId: this.goalId,
      IsSimulation: this.isSimulation,
      OptimizationRequestId: this.optimizationRequestId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CreateResourceOptimizationRequestResponse> {
    // No return value (204 No Content)
    return {};
  }
}
