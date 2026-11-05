import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AIEvaluationMetrics action
 */
export interface msdyn_AIEvaluationMetricsResponse {
  response: string;
}

/**
 * msdyn_AIEvaluationMetrics action
 *
 * Unbound action
 */
export class msdyn_AIEvaluationMetricsAction implements Executable<msdyn_AIEvaluationMetricsResponse> {
  constructor(public readonly request: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIEvaluationMetrics`;

    const body: Record<string, unknown> = {
      request: this.request,
    };

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
    const data = await response.json();
    return data as msdyn_AIEvaluationMetricsResponse;
  }
}
