import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExecuteAggregateAndUpdateIntentMetrics action
 */
export interface msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse {
  msdyn_status: string;
  msdyn_pagingcookieresponse: string;
}

/**
 * Parameters of the msdyn_ExecuteAggregateAndUpdateIntentMetrics action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteAggregateAndUpdateIntentMetricsActionParameters {
  msdyn_trackingdate: string;
  msdyn_shouldupdateintents?: boolean;
  msdyn_pagenumber: number;
  msdyn_batchsize?: number;
  msdyn_parallelexecutions?: number;
  msdyn_pagingcookie?: string;
  msdyn_trackingid: string;
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
      msdyn_trackingdate: this.parameters.msdyn_trackingdate,
      msdyn_shouldupdateintents: this.parameters.msdyn_shouldupdateintents,
      msdyn_pagenumber: this.parameters.msdyn_pagenumber,
      msdyn_batchsize: this.parameters.msdyn_batchsize,
      msdyn_parallelexecutions: this.parameters.msdyn_parallelexecutions,
      msdyn_pagingcookie: this.parameters.msdyn_pagingcookie,
      msdyn_trackingid: this.parameters.msdyn_trackingid,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse;
  }
}
