import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_createevaluationplanbatchResponse as msdyn_createevaluationplanbatchResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_createevaluationplanbatchResponse> {
    const data = await response.json();
    return msdyn_createevaluationplanbatchResponse.fromResponse(data);
  }
}

/**
 * msdyn_createevaluationplanbatch response message
 */
export class msdyn_createevaluationplanbatchResponse extends OrganizationResponse {
  constructor(public result: msdyn_createevaluationplanbatchResponseData) {
    super("msdyn_createevaluationplanbatch");
  }

  static fromResponse(data: unknown): msdyn_createevaluationplanbatchResponse {
    return new msdyn_createevaluationplanbatchResponse(
      responseObject<msdyn_createevaluationplanbatchResponseData>(data)
    );
  }
}
