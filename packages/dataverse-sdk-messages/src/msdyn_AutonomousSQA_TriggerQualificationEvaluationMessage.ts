import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AutonomousSQA_TriggerQualificationEvaluation request message
 *
 * Web API Action: msdyn_AutonomousSQA_TriggerQualificationEvaluation
 */
export class msdyn_AutonomousSQA_TriggerQualificationEvaluationRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse>
{
  constructor(
    public msdyn_IsResearchOnly: boolean,
    public msdyn_ShouldOverwriteQualificationDecision: boolean,
    public msdyn_QualificationDecision: number,
    public msdyn_TrackingId: string,
    public msdyn_SalesAgentRun: string
  ) {
    super("msdyn_AutonomousSQA_TriggerQualificationEvaluation");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse> {
    // No return value (204 No Content)
    return new msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_IsResearchOnly: this.msdyn_IsResearchOnly,
      msdyn_ShouldOverwriteQualificationDecision: this.msdyn_ShouldOverwriteQualificationDecision,
      msdyn_QualificationDecision: this.msdyn_QualificationDecision,
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
    };
  }
}

/**
 * msdyn_AutonomousSQA_TriggerQualificationEvaluation response message
 */
export class msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AutonomousSQA_TriggerQualificationEvaluation");
  }

  static fromResponse(_data: unknown): msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse {
    return new msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse();
  }
}
