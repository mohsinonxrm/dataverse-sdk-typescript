import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation request message
 *
 * Web API Action: msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation
 */
export class msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse>
{
  constructor(
    public msdyn_SalesAgentRun: string,
    public msdyn_QueueAgentRunRequestTimestamp: string,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation");
  }

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
    return msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_QueueAgentRunRequestTimestamp: this.msdyn_QueueAgentRunRequestTimestamp,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };
  }
}

/**
 * msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation response message
 */
export class msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse) {
    super("msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation");
  }

  static fromResponse(
    data: unknown
  ): msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse {
    return new msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse(
      (data as any).value
    );
  }
}
