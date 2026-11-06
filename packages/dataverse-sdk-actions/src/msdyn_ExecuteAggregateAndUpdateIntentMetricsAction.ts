import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExecuteAggregateAndUpdateIntentMetrics action
 */
export interface msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse {
  msdyn_pagingcookieresponse: string;
  msdyn_status: string;
}

/**
 * Parameters of the msdyn_ExecuteAggregateAndUpdateIntentMetrics action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteAggregateAndUpdateIntentMetricsActionParameters {
  msdyn_batchsize?: number;
  msdyn_pagenumber: number;
  msdyn_trackingid: string;
  msdyn_shouldupdateintents?: boolean;
  msdyn_trackingdate: string;
  msdyn_pagingcookie?: string;
  msdyn_parallelexecutions?: number;
}

/**
 * msdyn_ExecuteAggregateAndUpdateIntentMetrics action
 *
 * Unbound action
 */
export class msdyn_ExecuteAggregateAndUpdateIntentMetricsAction implements Executable<msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse> {
  constructor(
    public readonly parameters: msdyn_ExecuteAggregateAndUpdateIntentMetricsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteAggregateAndUpdateIntentMetrics`;

    const body = requestBody({
      msdyn_batchsize: this.parameters.msdyn_batchsize,
      msdyn_pagenumber: this.parameters.msdyn_pagenumber,
      msdyn_trackingid: this.parameters.msdyn_trackingid,
      msdyn_shouldupdateintents: this.parameters.msdyn_shouldupdateintents,
      msdyn_trackingdate: this.parameters.msdyn_trackingdate,
      msdyn_pagingcookie: this.parameters.msdyn_pagingcookie,
      msdyn_parallelexecutions: this.parameters.msdyn_parallelexecutions,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse;
    return (await response.json()) as msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse;
  }
}
