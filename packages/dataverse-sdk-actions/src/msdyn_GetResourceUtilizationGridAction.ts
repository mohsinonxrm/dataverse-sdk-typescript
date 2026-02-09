import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetResourceUtilizationGrid action
 */
export interface msdyn_GetResourceUtilizationGridResponse {
  ChartItems: string;
}

/**
 * msdyn_GetResourceUtilizationGrid action
 *
 * Unbound action
 */
export class msdyn_GetResourceUtilizationGridAction implements Executable<msdyn_GetResourceUtilizationGridResponse> {
  constructor(
    public readonly targetUtils: string,
    public readonly resourceIds: string,
    public readonly start: string,
    public readonly end: string,
    public readonly timescale: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceUtilizationGrid`;

    const body: Record<string, unknown> = {
      TargetUtils: this.targetUtils,
      ResourceIds: this.resourceIds,
      Start: this.start,
      End: this.end,
      Timescale: this.timescale,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceUtilizationGridResponse> {
    const data = await response.json();
    return data as msdyn_GetResourceUtilizationGridResponse;
  }
}
