import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetResourceWorkHoursForTimeFrame action
 */
export interface msdyn_GetResourceWorkHoursForTimeFrameResponse {
  ResourceData: string;
}

/**
 * msdyn_GetResourceWorkHoursForTimeFrame action
 *
 * Unbound action
 */
export class msdyn_GetResourceWorkHoursForTimeFrameAction implements Executable<msdyn_GetResourceWorkHoursForTimeFrameResponse> {
  constructor(
    public readonly end: string,
    public readonly start: string,
    public readonly resourceIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceWorkHoursForTimeFrame`;

    const body: Record<string, unknown> = {
      End: this.end,
      Start: this.start,
      ResourceIds: this.resourceIds,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetResourceWorkHoursForTimeFrameResponse> {
    const data = await response.json();
    return data as msdyn_GetResourceWorkHoursForTimeFrameResponse;
  }
}
