import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_SystemOptimizationMetrics action
 */
export interface CCaaS_SystemOptimizationMetricsResponse {
  Data: string;
  ErrorMessage: string;
  StatusCode: string;
}

/**
 * Parameters of the CCaaS_SystemOptimizationMetrics action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SystemOptimizationMetricsActionParameters {
  Endpoint: string;
  Params?: string;
}

/**
 * CCaaS_SystemOptimizationMetrics action
 *
 * Unbound action
 */
export class CCaaS_SystemOptimizationMetricsAction implements Executable<CCaaS_SystemOptimizationMetricsResponse> {
  constructor(public readonly parameters: CCaaS_SystemOptimizationMetricsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SystemOptimizationMetrics`;

    const body = requestBody({
      Endpoint: this.parameters.Endpoint,
      Params: this.parameters.Params,
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
    if (response.status === 204) return {} as CCaaS_SystemOptimizationMetricsResponse;
    return (await response.json()) as CCaaS_SystemOptimizationMetricsResponse;
  }
}
