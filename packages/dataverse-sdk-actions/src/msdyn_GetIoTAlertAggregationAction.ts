import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetIoTAlertAggregation action
 */
export interface msdyn_GetIoTAlertAggregationResponse {
  AggregateOutput: string;
  EntityLogicalName: string;
  DialogUniqueName: string;
}

/**
 * msdyn_GetIoTAlertAggregation action
 *
 * Unbound action
 */
export class msdyn_GetIoTAlertAggregationAction implements Executable<msdyn_GetIoTAlertAggregationResponse> {
  constructor(
    public readonly deviceId: string,
    public readonly timeRangeValue: number,
    public readonly timeRangeType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTAlertAggregation`;

    const body: Record<string, unknown> = {
      DeviceId: this.deviceId,
      TimeRangeValue: this.timeRangeValue,
      TimeRangeType: this.timeRangeType,
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

  async parseResponse(response: Response): Promise<msdyn_GetIoTAlertAggregationResponse> {
    const data = await response.json();
    return data as msdyn_GetIoTAlertAggregationResponse;
  }
}
