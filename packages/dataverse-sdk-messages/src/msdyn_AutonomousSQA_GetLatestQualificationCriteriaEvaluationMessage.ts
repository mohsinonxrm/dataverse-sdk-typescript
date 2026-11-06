import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationRequestParameters {
  msdyn_QueueAgentRunRequestTimestamp: string;
  msdyn_TrackingId: string;
  msdyn_SalesAgentRun: string;
}

/**
 * msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation request message
 *
 * Web API Action: msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation
 */
export class msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationRequestParameters>;

  constructor(
    parameters: msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationRequestParameters
  ) {
    super("msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation`;

    const body = requestBody({
      msdyn_QueueAgentRunRequestTimestamp: this.Parameters.msdyn_QueueAgentRunRequestTimestamp,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
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
    return msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResult {
  "@odata.context"?: string;
  msdyn_IsEvaluationComplete: boolean;
  msdyn_QualificationDecision: number;
}

/**
 * msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation response message
 *
 * `result` is the value the msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation action returns (see {@link msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResult}).
 */
export class msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse extends OrganizationResponse {
  constructor(public result: msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResult) {
    super("msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(
    data: unknown
  ): msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse {
    return new msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse(
      data as msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResult
    );
  }
}
