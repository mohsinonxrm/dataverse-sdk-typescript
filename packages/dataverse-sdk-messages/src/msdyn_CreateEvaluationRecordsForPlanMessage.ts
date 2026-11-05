import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      evaluationPlanId: this.evaluationPlanId,
      recordIdsForProcessing: this.recordIdsForProcessing,
    };
  }
}

/**
 * msdyn_CreateEvaluationRecordsForPlan response message
 */
export class msdyn_CreateEvaluationRecordsForPlanResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateEvaluationRecordsForPlanResponse) {
    super("msdyn_CreateEvaluationRecordsForPlan");
  }

  static fromResponse(data: unknown): msdyn_CreateEvaluationRecordsForPlanResponse {
    return new msdyn_CreateEvaluationRecordsForPlanResponse((data as any).value);
  }
}
