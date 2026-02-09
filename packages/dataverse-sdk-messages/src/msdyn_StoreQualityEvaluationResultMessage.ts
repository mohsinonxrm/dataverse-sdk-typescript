import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_StoreQualityEvaluationResult request message
 *
 * Web API Action: msdyn_StoreQualityEvaluationResult
 */
export class msdyn_StoreQualityEvaluationResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_StoreQualityEvaluationResultResponse>
{
  constructor(
    public criteriaVersionNumber: number,
    public evaluationId: string,
    public evaluationMethod: number,
    public evaluationInsight: string,
    public status: string
  ) {
    super("msdyn_StoreQualityEvaluationResult");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StoreQualityEvaluationResult`;

    const body: Record<string, unknown> = {
      CriteriaVersionNumber: this.criteriaVersionNumber,
      EvaluationId: this.evaluationId,
      EvaluationMethod: this.evaluationMethod,
      EvaluationInsight: this.evaluationInsight,
      Status: this.status,
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

  async parseResponse(response: Response): Promise<msdyn_StoreQualityEvaluationResultResponse> {
    const data = await response.json();
    return msdyn_StoreQualityEvaluationResultResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CriteriaVersionNumber: this.criteriaVersionNumber,
      EvaluationId: this.evaluationId,
      EvaluationMethod: this.evaluationMethod,
      EvaluationInsight: this.evaluationInsight,
      Status: this.status,
    };
  }
}

/**
 * msdyn_StoreQualityEvaluationResult response message
 */
export class msdyn_StoreQualityEvaluationResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_StoreQualityEvaluationResultResponse) {
    super("msdyn_StoreQualityEvaluationResult");
  }

  static fromResponse(data: unknown): msdyn_StoreQualityEvaluationResultResponse {
    return new msdyn_StoreQualityEvaluationResultResponse((data as any).value);
  }
}
