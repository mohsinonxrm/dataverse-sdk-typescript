import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateCadenceRunStatus action
 */
export interface msdyn_UpdateCadenceRunStatusResponse {
  // No content returned
}

/**
 * msdyn_UpdateCadenceRunStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateCadenceRunStatusAction implements Executable<msdyn_UpdateCadenceRunStatusResponse> {
  constructor(
    public readonly salesCadenceInstanceId: string,
    public readonly statusType: number,
    public readonly overallStatus: number,
    public readonly flowRunStatus: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateCadenceRunStatus`;

    const body: Record<string, unknown> = {
      SalesCadenceInstanceId: this.salesCadenceInstanceId,
      StatusType: this.statusType,
      OverallStatus: this.overallStatus,
      FlowRunStatus: this.flowRunStatus,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateCadenceRunStatusResponse> {
    // No return value (204 No Content)
    return {};
  }
}
