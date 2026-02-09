import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExecuteAggregateAndUpdateIntentMetrics action
 */
export interface msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse {
  msdyn_status: string;
  msdyn_pagingcookieresponse: string;
}

/**
 * msdyn_ExecuteAggregateAndUpdateIntentMetrics action
 *
 * Unbound action
 */
export class msdyn_ExecuteAggregateAndUpdateIntentMetricsAction implements Executable<msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse> {
  constructor(
    public readonly msdyn_trackingdate: string,
    public readonly msdyn_shouldupdateintents: boolean,
    public readonly msdyn_pagenumber: number,
    public readonly msdyn_batchsize: number,
    public readonly msdyn_parallelexecutions: number,
    public readonly msdyn_pagingcookie: string,
    public readonly msdyn_trackingid: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteAggregateAndUpdateIntentMetrics`;

    const body: Record<string, unknown> = {
      msdyn_trackingdate: this.msdyn_trackingdate,
      msdyn_shouldupdateintents: this.msdyn_shouldupdateintents,
      msdyn_pagenumber: this.msdyn_pagenumber,
      msdyn_batchsize: this.msdyn_batchsize,
      msdyn_parallelexecutions: this.msdyn_parallelexecutions,
      msdyn_pagingcookie: this.msdyn_pagingcookie,
      msdyn_trackingid: this.msdyn_trackingid,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse> {
    const data = await response.json();
    return data as msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse;
  }
}
