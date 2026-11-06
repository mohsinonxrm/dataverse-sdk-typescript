import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse as msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse.fromResponse({});
    return msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation response message
 */
export class msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponseData
  ) {
    super("msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluation");
  }

  static fromResponse(
    data: unknown
  ): msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse {
    return new msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponse(
      responseObject<msdyn_AutonomousSQA_GetLatestQualificationCriteriaEvaluationResponseData>(data)
    );
  }
}
