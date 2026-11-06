import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AIEvaluationMetrics action
 */
export interface msdyn_AIEvaluationMetricsResponse {
  response: string;
}

/**
 * Parameters of the msdyn_AIEvaluationMetrics action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AIEvaluationMetricsActionParameters {
  request: string;
}

/**
 * msdyn_AIEvaluationMetrics action
 *
 * Unbound action
 */
export class msdyn_AIEvaluationMetricsAction implements Executable<msdyn_AIEvaluationMetricsResponse> {
  constructor(public readonly parameters: msdyn_AIEvaluationMetricsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIEvaluationMetrics`;

    const body = requestBody({
      request: this.parameters.request,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_AIEvaluationMetricsResponse;
  }
}
