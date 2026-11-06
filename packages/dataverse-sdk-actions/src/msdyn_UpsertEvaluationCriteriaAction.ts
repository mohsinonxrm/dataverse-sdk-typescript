import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpsertEvaluationCriteria action
 */
export interface msdyn_UpsertEvaluationCriteriaResponse {
  msdyn_UpsertEvaluationCriteriaResponse: string;
}

/**
 * Parameters of the msdyn_UpsertEvaluationCriteria action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpsertEvaluationCriteriaActionParameters {
  msydn_UpsertEvaluationCriteriaPayload: string;
}

/**
 * msdyn_UpsertEvaluationCriteria action
 *
 * Unbound action
 */
export class msdyn_UpsertEvaluationCriteriaAction implements Executable<msdyn_UpsertEvaluationCriteriaResponse> {
  constructor(public readonly parameters: msdyn_UpsertEvaluationCriteriaActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpsertEvaluationCriteria`;

    const body = requestBody({
      msydn_UpsertEvaluationCriteriaPayload: this.parameters.msydn_UpsertEvaluationCriteriaPayload,
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

  async parseResponse(response: Response): Promise<msdyn_UpsertEvaluationCriteriaResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_UpsertEvaluationCriteriaResponse;
  }
}
