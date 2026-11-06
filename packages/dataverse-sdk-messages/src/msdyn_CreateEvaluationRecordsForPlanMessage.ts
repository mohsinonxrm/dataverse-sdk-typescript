import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CreateEvaluationRecordsForPlanResponse as msdyn_CreateEvaluationRecordsForPlanResponseData } from "./types/index.js";

/**
 * msdyn_CreateEvaluationRecordsForPlan request message
 *
 * Web API Action: msdyn_CreateEvaluationRecordsForPlan
 */
export class msdyn_CreateEvaluationRecordsForPlanRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateEvaluationRecordsForPlanResponse>
{
  constructor(
    public evaluationPlanId: string,
    public recordIdsForProcessing: string
  ) {
    super("msdyn_CreateEvaluationRecordsForPlan");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateEvaluationRecordsForPlan`;

    const body: Record<string, unknown> = {
      evaluationPlanId: this.evaluationPlanId,
      recordIdsForProcessing: this.recordIdsForProcessing,
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

  async parseResponse(response: Response): Promise<msdyn_CreateEvaluationRecordsForPlanResponse> {
    const data = await response.json();
    return msdyn_CreateEvaluationRecordsForPlanResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreateEvaluationRecordsForPlan response message
 */
export class msdyn_CreateEvaluationRecordsForPlanResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateEvaluationRecordsForPlanResponseData) {
    super("msdyn_CreateEvaluationRecordsForPlan");
  }

  static fromResponse(data: unknown): msdyn_CreateEvaluationRecordsForPlanResponse {
    return new msdyn_CreateEvaluationRecordsForPlanResponse(
      responseObject<msdyn_CreateEvaluationRecordsForPlanResponseData>(data)
    );
  }
}
