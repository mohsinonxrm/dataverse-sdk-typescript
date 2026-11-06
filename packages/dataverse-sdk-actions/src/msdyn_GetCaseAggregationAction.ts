import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetCaseAggregation action
 */
export interface msdyn_GetCaseAggregationResponse {
  AggregateOutput: string;
  DialogUniqueName: string;
  EntityLogicalName: string;
}

/**
 * Parameters of the msdyn_GetCaseAggregation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCaseAggregationActionParameters {
  DeviceId: string;
  TimeRangeValue: number;
  TimeRangeType: string;
}

/**
 * msdyn_GetCaseAggregation action
 *
 * Unbound action
 */
export class msdyn_GetCaseAggregationAction implements Executable<msdyn_GetCaseAggregationResponse> {
  constructor(public readonly parameters: msdyn_GetCaseAggregationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCaseAggregation`;

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

  async parseResponse(response: Response): Promise<msdyn_GetCaseAggregationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetCaseAggregationResponse;
    return (await response.json()) as msdyn_GetCaseAggregationResponse;
  }
}
