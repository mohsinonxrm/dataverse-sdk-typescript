import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AutonomousSQA_TriggerQualificationEvaluation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_TriggerQualificationEvaluationRequestParameters {
  msdyn_IsResearchOnly?: boolean;
  msdyn_QualificationDecision?: number;
  msdyn_SalesAgentRun: string;
  msdyn_ShouldOverwriteQualificationDecision?: boolean;
  msdyn_TrackingId: string;
}

/**
 * msdyn_AutonomousSQA_TriggerQualificationEvaluation request message
 *
 * Web API Action: msdyn_AutonomousSQA_TriggerQualificationEvaluation
 */
export class msdyn_AutonomousSQA_TriggerQualificationEvaluationRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutonomousSQA_TriggerQualificationEvaluationRequestParameters>;

  constructor(parameters: msdyn_AutonomousSQA_TriggerQualificationEvaluationRequestParameters) {
    super("msdyn_AutonomousSQA_TriggerQualificationEvaluation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_TriggerQualificationEvaluation`;

    const body = requestBody({
      msdyn_IsResearchOnly: this.Parameters.msdyn_IsResearchOnly,
      msdyn_QualificationDecision: this.Parameters.msdyn_QualificationDecision,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
      msdyn_ShouldOverwriteQualificationDecision:
        this.Parameters.msdyn_ShouldOverwriteQualificationDecision,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
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
  ): Promise<msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse> {
    // No return value (204 No Content)
    return new msdyn_AutonomousSQA_TriggerQualificationEvaluationResponse();
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
