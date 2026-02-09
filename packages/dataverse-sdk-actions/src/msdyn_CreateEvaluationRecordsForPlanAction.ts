import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateEvaluationRecordsForPlan action
 */
export interface msdyn_CreateEvaluationRecordsForPlanResponse {
  createdEvaluationRecords: string;
}

/**
 * msdyn_CreateEvaluationRecordsForPlan action
 *
 * Unbound action
 */
export class msdyn_CreateEvaluationRecordsForPlanAction implements Executable<msdyn_CreateEvaluationRecordsForPlanResponse> {
  constructor(
    public readonly evaluationPlanId: string,
    public readonly recordIdsForProcessing: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreateEvaluationRecordsForPlanResponse> {
    const data = await response.json();
    return data as msdyn_CreateEvaluationRecordsForPlanResponse;
  }
}
