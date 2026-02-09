import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ExecuteAggregateAndUpdateIntentMetrics request message
 *
 * Web API Action: msdyn_ExecuteAggregateAndUpdateIntentMetrics
 */
export class msdyn_ExecuteAggregateAndUpdateIntentMetricsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse>
{
  constructor(
    public msdyn_trackingdate: string,
    public msdyn_shouldupdateintents: boolean,
    public msdyn_pagenumber: number,
    public msdyn_batchsize: number,
    public msdyn_parallelexecutions: number,
    public msdyn_pagingcookie: string,
    public msdyn_trackingid: string
  ) {
    super("msdyn_ExecuteAggregateAndUpdateIntentMetrics");
  }

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
    return msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_trackingdate: this.msdyn_trackingdate,
      msdyn_shouldupdateintents: this.msdyn_shouldupdateintents,
      msdyn_pagenumber: this.msdyn_pagenumber,
      msdyn_batchsize: this.msdyn_batchsize,
      msdyn_parallelexecutions: this.msdyn_parallelexecutions,
      msdyn_pagingcookie: this.msdyn_pagingcookie,
      msdyn_trackingid: this.msdyn_trackingid,
    };
  }
}

/**
 * msdyn_ExecuteAggregateAndUpdateIntentMetrics response message
 */
export class msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse) {
    super("msdyn_ExecuteAggregateAndUpdateIntentMetrics");
  }

  static fromResponse(data: unknown): msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse {
    return new msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse((data as any).value);
  }
}
