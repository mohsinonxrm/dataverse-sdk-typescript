import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpsertEvaluationCriteria action
 */
export interface msdyn_UpsertEvaluationCriteriaResponse {
  msdyn_UpsertEvaluationCriteriaResponse: string;
}

/**
 * msdyn_UpsertEvaluationCriteria action
 *
 * Unbound action
 */
export class msdyn_UpsertEvaluationCriteriaAction implements Executable<msdyn_UpsertEvaluationCriteriaResponse> {
  constructor(public readonly msydn_UpsertEvaluationCriteriaPayload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpsertEvaluationCriteria`;

    const body: Record<string, unknown> = {
      msydn_UpsertEvaluationCriteriaPayload: this.msydn_UpsertEvaluationCriteriaPayload,
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

  async parseResponse(response: Response): Promise<msdyn_UpsertEvaluationCriteriaResponse> {
    const data = await response.json();
    return data as msdyn_UpsertEvaluationCriteriaResponse;
  }
}
