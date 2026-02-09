import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ManageSLAInstances action
 */
export interface msdyn_ManageSLAInstancesResponse {
  // No content returned
}

/**
 * msdyn_ManageSLAInstances action
 *
 * Unbound action
 */
export class msdyn_ManageSLAInstancesAction implements Executable<msdyn_ManageSLAInstancesResponse> {
  constructor(
    public readonly sLAId: string,
    public readonly regardingId: string,
    public readonly entityLogicalName: string,
    public readonly recalculate: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ManageSLAInstances`;

    const body: Record<string, unknown> = {
      SLAId: this.sLAId,
      RegardingId: this.regardingId,
      EntityLogicalName: this.entityLogicalName,
      Recalculate: this.recalculate,
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

  async parseResponse(response: Response): Promise<msdyn_ManageSLAInstancesResponse> {
    // No return value (204 No Content)
    return {};
  }
}
