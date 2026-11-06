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
  CriteriaVersionNumber: number;
  EvaluationId: string;
  EvaluationMethod?: number;
  EvaluationInsight?: string;
  Status: string;
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
      CriteriaVersionNumber: this.parameters.CriteriaVersionNumber,
      EvaluationId: this.parameters.EvaluationId,
      EvaluationMethod: this.parameters.EvaluationMethod,
      EvaluationInsight: this.parameters.EvaluationInsight,
      Status: this.parameters.Status,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_StoreQualityEvaluationResultResponse;
  }
}
