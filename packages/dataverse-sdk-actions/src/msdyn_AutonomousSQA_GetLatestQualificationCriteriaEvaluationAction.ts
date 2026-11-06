import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse {
  "@odata.context"?: string;
  msdyn_IsEvaluationComplete: boolean;
  msdyn_QualificationDecision: number;
}

/**
 * Parameters of the msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationActionParameters {
  msdyn_QueueAgentRunRequestTimestamp: string;
  msdyn_TrackingId: string;
  msdyn_SalesAgentRun: string;
}

/**
 * msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationAction implements Executable<msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse> {
  constructor(
    public readonly parameters: msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation`;

    const body = requestBody({
      msdyn_QueueAgentRunRequestTimestamp: this.parameters.msdyn_QueueAgentRunRequestTimestamp,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse;
  }
}
