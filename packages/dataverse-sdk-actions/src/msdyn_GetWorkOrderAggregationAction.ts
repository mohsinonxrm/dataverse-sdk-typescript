import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetWorkOrderAggregation action
 */
export interface msdyn_GetWorkOrderAggregationResponse {
  AggregateOutput: string;
  EntityLogicalName: string;
  DialogUniqueName: string;
}

/**
 * msdyn_GetWorkOrderAggregation action
 *
 * Unbound action
 */
export class msdyn_GetWorkOrderAggregationAction implements Executable<msdyn_GetWorkOrderAggregationResponse> {
  constructor(
    public readonly deviceId: string,
    public readonly timeRangeValue: number,
    public readonly timeRangeType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWorkOrderAggregation`;

    const body: Record<string, unknown> = {
      DeviceId: this.deviceId,
      TimeRangeValue: this.timeRangeValue,
      TimeRangeType: this.timeRangeType,
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

  async parseResponse(response: Response): Promise<msdyn_GetWorkOrderAggregationResponse> {
    const data = await response.json();
    return data as msdyn_GetWorkOrderAggregationResponse;
  }
}
