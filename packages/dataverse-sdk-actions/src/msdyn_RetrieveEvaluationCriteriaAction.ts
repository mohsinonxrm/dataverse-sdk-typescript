import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveEvaluationCriteria action
 */
export interface msdyn_RetrieveEvaluationCriteriaResponse {
  msydn_RetrieveEvaluationCriteriaResponse: string;
}

/**
 * msdyn_RetrieveEvaluationCriteria action
 *
 * Unbound action
 */
export class msdyn_RetrieveEvaluationCriteriaAction implements Executable<msdyn_RetrieveEvaluationCriteriaResponse> {
  constructor(public readonly msydn_RetrieveEvaluationCriteriaPayload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEvaluationCriteria`;

    const body: Record<string, unknown> = {
      msydn_RetrieveEvaluationCriteriaPayload: this.msydn_RetrieveEvaluationCriteriaPayload,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveEvaluationCriteriaResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveEvaluationCriteriaResponse;
  }
}
