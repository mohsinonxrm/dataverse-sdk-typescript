import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdn_evaluationplanorchestrator request message
 *
 * Web API Action: msdn_evaluationplanorchestrator
 */
export class msdn_evaluationplanorchestratorRequest
  extends OrganizationRequest
  implements Executable<msdn_evaluationplanorchestratorResponse>
{
  constructor(public evalPlanId: string) {
    super("msdn_evaluationplanorchestrator");
  }

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
    return msdn_evaluationplanorchestratorResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EvalPlanId: this.evalPlanId,
    };
  }
}

/**
 * msdn_evaluationplanorchestrator response message
 */
export class msdn_evaluationplanorchestratorResponse extends OrganizationResponse {
  constructor(public result: msdn_evaluationplanorchestratorResponse) {
    super("msdn_evaluationplanorchestrator");
  }

  static fromResponse(data: unknown): msdn_evaluationplanorchestratorResponse {
    return new msdn_evaluationplanorchestratorResponse((data as any).value);
  }
}
