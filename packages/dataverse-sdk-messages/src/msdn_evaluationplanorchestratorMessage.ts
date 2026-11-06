import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdn_evaluationplanorchestratorResponse as msdn_evaluationplanorchestratorResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdn_evaluationplanorchestratorResponse.fromResponse({});
    return msdn_evaluationplanorchestratorResponse.fromResponse(await response.json());
  }
}

/**
 * msdn_evaluationplanorchestrator response message
 */
export class msdn_evaluationplanorchestratorResponse extends OrganizationResponse {
  constructor(public result: msdn_evaluationplanorchestratorResponseData) {
    super("msdn_evaluationplanorchestrator");
  }

  static fromResponse(data: unknown): msdn_evaluationplanorchestratorResponse {
    return new msdn_evaluationplanorchestratorResponse(
      responseObject<msdn_evaluationplanorchestratorResponseData>(data)
    );
  }
}
