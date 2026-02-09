import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_createevaluationplanbatch action
 */
export interface msdyn_createevaluationplanbatchResponse {
  Status: boolean;
}

/**
 * msdyn_createevaluationplanbatch action
 *
 * Unbound action
 */
export class msdyn_createevaluationplanbatchAction implements Executable<msdyn_createevaluationplanbatchResponse> {
  constructor(public readonly evaluationPlanRunId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_createevaluationplanbatch`;

    const body: Record<string, unknown> = {
      EvaluationPlanRunId: this.evaluationPlanRunId,
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

  async parseResponse(response: Response): Promise<msdyn_createevaluationplanbatchResponse> {
    const data = await response.json();
    return data as msdyn_createevaluationplanbatchResponse;
  }
}
