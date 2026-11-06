import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdn_evaluationplanorchestrator action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdn_evaluationplanorchestratorResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdn_evaluationplanorchestratorResponse;
  }
}
