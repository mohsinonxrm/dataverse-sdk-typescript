import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AIEvaluationMetricsWrapper action
 */
export interface msdyn_AIEvaluationMetricsWrapperResponse {
  response: string;
}

/**
 * msdyn_AIEvaluationMetricsWrapper action
 *
 * Unbound action
 */
export class msdyn_AIEvaluationMetricsWrapperAction implements Executable<msdyn_AIEvaluationMetricsWrapperResponse> {
  constructor(public readonly request: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIEvaluationMetricsWrapper`;

    const body: Record<string, unknown> = {
      request: this.request,
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

  async parseResponse(response: Response): Promise<msdyn_AIEvaluationMetricsWrapperResponse> {
    const data = await response.json();
    return data as msdyn_AIEvaluationMetricsWrapperResponse;
  }
}
