import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AIEvaluationMetrics message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AIEvaluationMetricsRequestParameters {
  request: string;
}

/**
 * msdyn_AIEvaluationMetrics request message
 *
 * Web API Action: msdyn_AIEvaluationMetrics
 */
export class msdyn_AIEvaluationMetricsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AIEvaluationMetricsResponse>
{
  declare readonly Parameters: Readonly<msdyn_AIEvaluationMetricsRequestParameters>;

  constructor(parameters: msdyn_AIEvaluationMetricsRequestParameters) {
    super("msdyn_AIEvaluationMetrics", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIEvaluationMetrics`;

    const body = requestBody({
      request: this.Parameters.request,
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

  async parseResponse(response: Response): Promise<msdyn_AIEvaluationMetricsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_AIEvaluationMetricsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AIEvaluationMetrics action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AIEvaluationMetricsResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * msdyn_AIEvaluationMetrics response message
 *
 * `result` is the value the msdyn_AIEvaluationMetrics action returns (see {@link msdyn_AIEvaluationMetricsResult}).
 */
export class msdyn_AIEvaluationMetricsResponse extends OrganizationResponse {
  constructor(public result: msdyn_AIEvaluationMetricsResult) {
    super("msdyn_AIEvaluationMetrics");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AIEvaluationMetricsResponse {
    return new msdyn_AIEvaluationMetricsResponse(data as msdyn_AIEvaluationMetricsResult);
  }
}
