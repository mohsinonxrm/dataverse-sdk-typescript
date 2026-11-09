import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AutonomousSQA_TriggerQualificationEvaluation action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse = void;

/**
 * Parameters of the msdyn_AutonomousSQA_TriggerQualificationEvaluation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_TriggerQualificationEvaluationActionParameters {
  msdyn_IsResearchOnly?: boolean;
  msdyn_QualificationDecision?: number;
  msdyn_SalesAgentRun: string;
  msdyn_ShouldOverwriteQualificationDecision?: boolean;
  msdyn_TrackingId: string;
}

/**
 * msdyn_AutonomousSQA_TriggerQualificationEvaluation action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_TriggerQualificationEvaluationAction implements Executable<msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse> {
  constructor(
    public readonly parameters: msdyn_AutonomousSQA_TriggerQualificationEvaluationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_TriggerQualificationEvaluation`;

    const body = requestBody({
      msdyn_IsResearchOnly: this.parameters.msdyn_IsResearchOnly,
      msdyn_QualificationDecision: this.parameters.msdyn_QualificationDecision,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_ShouldOverwriteQualificationDecision:
        this.parameters.msdyn_ShouldOverwriteQualificationDecision,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
