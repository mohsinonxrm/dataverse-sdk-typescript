import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ExecuteAggregateAndUpdateIntentMetrics message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteAggregateAndUpdateIntentMetricsRequestParameters {
  msdyn_batchsize?: number;
  msdyn_pagenumber: number;
  msdyn_trackingid: string;
  msdyn_shouldupdateintents?: boolean;
  msdyn_trackingdate: string;
  msdyn_pagingcookie?: string;
  msdyn_parallelexecutions?: number;
}

/**
 * msdyn_ExecuteAggregateAndUpdateIntentMetrics request message
 *
 * Web API Action: msdyn_ExecuteAggregateAndUpdateIntentMetrics
 */
export class msdyn_ExecuteAggregateAndUpdateIntentMetricsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteAggregateAndUpdateIntentMetricsRequestParameters>;

  constructor(parameters: msdyn_ExecuteAggregateAndUpdateIntentMetricsRequestParameters) {
    super("msdyn_ExecuteAggregateAndUpdateIntentMetrics", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteAggregateAndUpdateIntentMetrics`;

    const body = requestBody({
      msdyn_batchsize: this.Parameters.msdyn_batchsize,
      msdyn_pagenumber: this.Parameters.msdyn_pagenumber,
      msdyn_trackingid: this.Parameters.msdyn_trackingid,
      msdyn_shouldupdateintents: this.Parameters.msdyn_shouldupdateintents,
      msdyn_trackingdate: this.Parameters.msdyn_trackingdate,
      msdyn_pagingcookie: this.Parameters.msdyn_pagingcookie,
      msdyn_parallelexecutions: this.Parameters.msdyn_parallelexecutions,
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
    // The body is the complex value, with its @odata.context
    return msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExecuteAggregateAndUpdateIntentMetrics action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteAggregateAndUpdateIntentMetricsResult {
  "@odata.context"?: string;
  msdyn_pagingcookieresponse: string;
  msdyn_status: string;
}

/**
 * msdyn_ExecuteAggregateAndUpdateIntentMetrics response message
 *
 * `result` is the value the msdyn_ExecuteAggregateAndUpdateIntentMetrics action returns (see {@link msdyn_ExecuteAggregateAndUpdateIntentMetricsResult}).
 */
export class msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteAggregateAndUpdateIntentMetricsResult) {
    super("msdyn_ExecuteAggregateAndUpdateIntentMetrics");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse {
    return new msdyn_ExecuteAggregateAndUpdateIntentMetricsResponse(
      data as msdyn_ExecuteAggregateAndUpdateIntentMetricsResult
    );
  }
}
