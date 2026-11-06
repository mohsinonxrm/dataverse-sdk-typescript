import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdn_evaluationplanorchestrator action
 */
export interface msdn_evaluationplanorchestratorResponse {
  Status: boolean;
}

/**
 * Parameters of the msdn_evaluationplanorchestrator action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdn_evaluationplanorchestratorActionParameters {
  EvalPlanId: string;
}

/**
 * msdn_evaluationplanorchestrator action
 *
 * Unbound action
 */
export class msdn_evaluationplanorchestratorAction implements Executable<msdn_evaluationplanorchestratorResponse> {
  constructor(public readonly parameters: msdn_evaluationplanorchestratorActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdn_evaluationplanorchestrator`;

    const body = requestBody({
      EvalPlanId: this.parameters.EvalPlanId,
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

  async parseResponse(response: Response): Promise<msdn_evaluationplanorchestratorResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdn_evaluationplanorchestratorResponse;
  }
}
