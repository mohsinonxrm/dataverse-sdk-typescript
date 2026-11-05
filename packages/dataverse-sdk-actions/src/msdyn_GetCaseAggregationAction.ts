import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetCaseAggregation action
 */
export interface msdyn_GetCaseAggregationResponse {
  AggregateOutput: string;
  EntityLogicalName: string;
  DialogUniqueName: string;
}

/**
 * msdyn_GetCaseAggregation action
 *
 * Unbound action
 */
export class msdyn_GetCaseAggregationAction implements Executable<msdyn_GetCaseAggregationResponse> {
  constructor(
    public readonly deviceId: string,
    public readonly timeRangeValue: number,
    public readonly timeRangeType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCaseAggregation`;

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

  async parseResponse(response: Response): Promise<msdyn_GetCaseAggregationResponse> {
    const data = await response.json();
    return data as msdyn_GetCaseAggregationResponse;
  }
}
