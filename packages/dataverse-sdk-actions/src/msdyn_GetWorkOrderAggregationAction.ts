import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetWorkOrderAggregation action
 */
export interface msdyn_GetWorkOrderAggregationResponse {
  AggregateOutput: string;
  EntityLogicalName: string;
  DialogUniqueName: string;
}

/**
 * Parameters of the msdyn_GetWorkOrderAggregation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetWorkOrderAggregationActionParameters {
  DeviceId: string;
  TimeRangeValue: number;
  TimeRangeType: string;
}

/**
 * msdyn_GetWorkOrderAggregation action
 *
 * Unbound action
 */
export class msdyn_GetWorkOrderAggregationAction implements Executable<msdyn_GetWorkOrderAggregationResponse> {
  constructor(public readonly parameters: msdyn_GetWorkOrderAggregationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWorkOrderAggregation`;

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

  async parseResponse(response: Response): Promise<msdyn_GetWorkOrderAggregationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetWorkOrderAggregationResponse;
    return (await response.json()) as msdyn_GetWorkOrderAggregationResponse;
  }
}
