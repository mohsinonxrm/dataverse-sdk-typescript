import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_StoreQualityEvaluationResult action
 */
export interface msdyn_StoreQualityEvaluationResultResponse {
  EnrichedEvaluationInsight: string;
}

/**
 * msdyn_StoreQualityEvaluationResult action
 *
 * Unbound action
 */
export class msdyn_StoreQualityEvaluationResultAction implements Executable<msdyn_StoreQualityEvaluationResultResponse> {
  constructor(
    public readonly criteriaVersionNumber: number,
    public readonly evaluationId: string,
    public readonly evaluationMethod: number,
    public readonly evaluationInsight: string,
    public readonly status: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_StoreQualityEvaluationResultResponse> {
    const data = await response.json();
    return data as msdyn_StoreQualityEvaluationResultResponse;
  }
}
