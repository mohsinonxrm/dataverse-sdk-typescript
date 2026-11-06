import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_StoreQualityEvaluationResult action
 */
export interface msdyn_StoreQualityEvaluationResultResponse {
  EnrichedEvaluationInsight: string;
}

/**
 * Parameters of the msdyn_StoreQualityEvaluationResult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StoreQualityEvaluationResultActionParameters {
  EvaluationMethod?: number;
  Status: string;
  RepresentativeId?: string;
  CriteriaVersionNumber: number;
  EvaluationId: string;
  EvaluationInsight?: string;
}

/**
 * msdyn_StoreQualityEvaluationResult action
 *
 * Unbound action
 */
export class msdyn_StoreQualityEvaluationResultAction implements Executable<msdyn_StoreQualityEvaluationResultResponse> {
  constructor(public readonly parameters: msdyn_StoreQualityEvaluationResultActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StoreQualityEvaluationResult`;

    const body = requestBody({
      EvaluationMethod: this.parameters.EvaluationMethod,
      Status: this.parameters.Status,
      RepresentativeId: this.parameters.RepresentativeId,
      CriteriaVersionNumber: this.parameters.CriteriaVersionNumber,
      EvaluationId: this.parameters.EvaluationId,
      EvaluationInsight: this.parameters.EvaluationInsight,
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

  async parseResponse(response: Response): Promise<msdyn_StoreQualityEvaluationResultResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_StoreQualityEvaluationResultResponse;
    return (await response.json()) as msdyn_StoreQualityEvaluationResultResponse;
  }
}
