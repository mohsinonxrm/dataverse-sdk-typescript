import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation action
 */
export interface msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse {
  msdyn_QualificationDecision: number;
  msdyn_IsEvaluationComplete: boolean;
}

/**
 * msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationAction implements Executable<msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse> {
  constructor(
    public readonly msdyn_SalesAgentRun: string,
    public readonly msdyn_QueueAgentRunRequestTimestamp: string,
    public readonly msdyn_TrackingId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation`;

    const body: Record<string, unknown> = {
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_QueueAgentRunRequestTimestamp: this.msdyn_QueueAgentRunRequestTimestamp,
      msdyn_TrackingId: this.msdyn_TrackingId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse> {
    const data = await response.json();
    return data as msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse;
  }
}
