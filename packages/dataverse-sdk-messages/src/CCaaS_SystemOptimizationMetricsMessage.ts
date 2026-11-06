import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_SystemOptimizationMetrics message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SystemOptimizationMetricsRequestParameters {
  Endpoint: string;
  Params?: string;
}

/**
 * CCaaS_SystemOptimizationMetrics request message
 *
 * Web API Action: CCaaS_SystemOptimizationMetrics
 */
export class CCaaS_SystemOptimizationMetricsRequest
  extends OrganizationRequest
  implements Executable<CCaaS_SystemOptimizationMetricsResponse>
{
  declare readonly Parameters: Readonly<CCaaS_SystemOptimizationMetricsRequestParameters>;

  constructor(parameters: CCaaS_SystemOptimizationMetricsRequestParameters) {
    super("CCaaS_SystemOptimizationMetrics", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SystemOptimizationMetrics`;

    const body = requestBody({
      Endpoint: this.Parameters.Endpoint,
      Params: this.Parameters.Params,
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

  async parseResponse(response: Response): Promise<CCaaS_SystemOptimizationMetricsResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_SystemOptimizationMetricsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_SystemOptimizationMetrics action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_SystemOptimizationMetricsResult {
  "@odata.context"?: string;
  Data: string;
  ErrorMessage: string;
  StatusCode: string;
}

/**
 * CCaaS_SystemOptimizationMetrics response message
 *
 * `result` is the value the CCaaS_SystemOptimizationMetrics action returns (see {@link CCaaS_SystemOptimizationMetricsResult}).
 */
export class CCaaS_SystemOptimizationMetricsResponse extends OrganizationResponse {
  constructor(public result: CCaaS_SystemOptimizationMetricsResult) {
    super("CCaaS_SystemOptimizationMetrics");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_SystemOptimizationMetricsResponse {
    return new CCaaS_SystemOptimizationMetricsResponse(
      data as CCaaS_SystemOptimizationMetricsResult
    );
  }
}
