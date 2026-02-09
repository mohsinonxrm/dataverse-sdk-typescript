import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdn_evaluationplanorchestrator action
 */
export interface msdn_evaluationplanorchestratorResponse {
  Status: boolean;
}

/**
 * msdn_evaluationplanorchestrator action
 *
 * Unbound action
 */
export class msdn_evaluationplanorchestratorAction implements Executable<msdn_evaluationplanorchestratorResponse> {
  constructor(public readonly evalPlanId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdn_evaluationplanorchestrator`;

    const body: Record<string, unknown> = {
      EvalPlanId: this.evalPlanId,
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

  async parseResponse(response: Response): Promise<msdn_evaluationplanorchestratorResponse> {
    const data = await response.json();
    return data as msdn_evaluationplanorchestratorResponse;
  }
}
