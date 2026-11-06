import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RetrieveEvaluationCriteria action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveEvaluationCriteriaResponse {
  "@odata.context"?: string;
  msydn_RetrieveEvaluationCriteriaResponse: string;
}

/**
 * Parameters of the msdyn_RetrieveEvaluationCriteria action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveEvaluationCriteriaActionParameters {
  msydn_RetrieveEvaluationCriteriaPayload: string;
}

/**
 * msdyn_RetrieveEvaluationCriteria action
 *
 * Unbound action
 */
export class msdyn_RetrieveEvaluationCriteriaAction implements Executable<msdyn_RetrieveEvaluationCriteriaResponse> {
  constructor(public readonly parameters: msdyn_RetrieveEvaluationCriteriaActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEvaluationCriteria`;

    const body = requestBody({
      msydn_RetrieveEvaluationCriteriaPayload:
        this.parameters.msydn_RetrieveEvaluationCriteriaPayload,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveEvaluationCriteriaResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveEvaluationCriteriaResponse;
  }
}
