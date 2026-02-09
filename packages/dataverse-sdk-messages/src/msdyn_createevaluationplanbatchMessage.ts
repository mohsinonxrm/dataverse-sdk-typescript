import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_createevaluationplanbatch request message
 *
 * Web API Action: msdyn_createevaluationplanbatch
 */
export class msdyn_createevaluationplanbatchRequest
  extends OrganizationRequest
  implements Executable<msdyn_createevaluationplanbatchResponse>
{
  constructor(public evaluationPlanRunId: string) {
    super("msdyn_createevaluationplanbatch");
  }

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
    return msdyn_createevaluationplanbatchResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EvaluationPlanRunId: this.evaluationPlanRunId,
    };
  }
}

/**
 * msdyn_createevaluationplanbatch response message
 */
export class msdyn_createevaluationplanbatchResponse extends OrganizationResponse {
  constructor(public result: msdyn_createevaluationplanbatchResponse) {
    super("msdyn_createevaluationplanbatch");
  }

  static fromResponse(data: unknown): msdyn_createevaluationplanbatchResponse {
    return new msdyn_createevaluationplanbatchResponse((data as any).value);
  }
}
