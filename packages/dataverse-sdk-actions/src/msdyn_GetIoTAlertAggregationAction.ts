import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetIoTAlertAggregation action
 */
export interface msdyn_GetIoTAlertAggregationResponse {
  AggregateOutput: string;
  DialogUniqueName: string;
  EntityLogicalName: string;
}

/**
 * Parameters of the msdyn_GetIoTAlertAggregation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetIoTAlertAggregationActionParameters {
  DeviceId: string;
  TimeRangeValue: number;
  TimeRangeType: string;
}

/**
 * msdyn_GetIoTAlertAggregation action
 *
 * Unbound action
 */
export class msdyn_GetIoTAlertAggregationAction implements Executable<msdyn_GetIoTAlertAggregationResponse> {
  constructor(public readonly parameters: msdyn_GetIoTAlertAggregationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTAlertAggregation`;

    const body = requestBody({
      DeviceId: this.parameters.DeviceId,
      TimeRangeValue: this.parameters.TimeRangeValue,
      TimeRangeType: this.parameters.TimeRangeType,
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

  async parseResponse(response: Response): Promise<msdyn_GetIoTAlertAggregationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetIoTAlertAggregationResponse;
    return (await response.json()) as msdyn_GetIoTAlertAggregationResponse;
  }
}
