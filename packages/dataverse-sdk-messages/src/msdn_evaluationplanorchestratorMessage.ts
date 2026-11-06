import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdn_evaluationplanorchestrator message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdn_evaluationplanorchestratorRequestParameters {
  EvalPlanId: string;
}

/**
 * msdn_evaluationplanorchestrator request message
 *
 * Web API Action: msdn_evaluationplanorchestrator
 */
export class msdn_evaluationplanorchestratorRequest
  extends OrganizationRequest
  implements Executable<msdn_evaluationplanorchestratorResponse>
{
  declare readonly Parameters: Readonly<msdn_evaluationplanorchestratorRequestParameters>;

  constructor(parameters: msdn_evaluationplanorchestratorRequestParameters) {
    super("msdn_evaluationplanorchestrator", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdn_evaluationplanorchestrator`;

    const body = requestBody({
      EvalPlanId: this.Parameters.EvalPlanId,
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
    return msdn_evaluationplanorchestratorResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdn_evaluationplanorchestrator action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdn_evaluationplanorchestratorResult {
  "@odata.context"?: string;
  Status: boolean;
}

/**
 * msdn_evaluationplanorchestrator response message
 *
 * `result` is the value the msdn_evaluationplanorchestrator action returns (see {@link msdn_evaluationplanorchestratorResult}).
 */
export class msdn_evaluationplanorchestratorResponse extends OrganizationResponse {
  constructor(public result: msdn_evaluationplanorchestratorResult) {
    super("msdn_evaluationplanorchestrator");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdn_evaluationplanorchestratorResponse {
    return new msdn_evaluationplanorchestratorResponse(
      data as msdn_evaluationplanorchestratorResult
    );
  }
}
