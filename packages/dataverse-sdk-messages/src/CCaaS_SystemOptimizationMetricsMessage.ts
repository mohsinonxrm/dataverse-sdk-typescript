import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_SystemOptimizationMetricsResponse as CCaaS_SystemOptimizationMetricsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_SystemOptimizationMetricsResponse.fromResponse({});
    return CCaaS_SystemOptimizationMetricsResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_SystemOptimizationMetrics response message
 */
export class CCaaS_SystemOptimizationMetricsResponse extends OrganizationResponse {
  constructor(public result: CCaaS_SystemOptimizationMetricsResponseData) {
    super("CCaaS_SystemOptimizationMetrics");
  }

  static fromResponse(data: unknown): CCaaS_SystemOptimizationMetricsResponse {
    return new CCaaS_SystemOptimizationMetricsResponse(
      responseObject<CCaaS_SystemOptimizationMetricsResponseData>(data)
    );
  }
}
