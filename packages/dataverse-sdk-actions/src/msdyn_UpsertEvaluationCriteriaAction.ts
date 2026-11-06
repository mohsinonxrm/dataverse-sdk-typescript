import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpsertEvaluationCriteria action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpsertEvaluationCriteriaResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UpsertEvaluationCriteriaResponse;
  }
}
