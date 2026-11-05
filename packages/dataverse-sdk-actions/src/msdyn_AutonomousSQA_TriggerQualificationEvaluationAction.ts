import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AutonomousSQA_TriggerQualificationEvaluation action
 */
export interface msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse {
  // No content returned
}

/**
 * msdyn_AutonomousSQA_TriggerQualificationEvaluation action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_TriggerQualificationEvaluationAction implements Executable<msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse> {
  constructor(
    public readonly msdyn_IsResearchOnly: boolean,
    public readonly msdyn_ShouldOverwriteQualificationDecision: boolean,
    public readonly msdyn_QualificationDecision: number,
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_SalesAgentRun: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_TriggerQualificationEvaluation`;

    const body: Record<string, unknown> = {
      msdyn_IsResearchOnly: this.msdyn_IsResearchOnly,
      msdyn_ShouldOverwriteQualificationDecision: this.msdyn_ShouldOverwriteQualificationDecision,
      msdyn_QualificationDecision: this.msdyn_QualificationDecision,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
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
  ): Promise<msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
