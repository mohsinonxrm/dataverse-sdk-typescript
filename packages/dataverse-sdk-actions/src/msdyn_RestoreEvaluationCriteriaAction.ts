import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RestoreEvaluationCriteria action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RestoreEvaluationCriteriaResponse {
  "@odata.context"?: string;
  msdyn_RestoreEvaluationCriteriaResponse: string;
}

/**
 * Parameters of the msdyn_RestoreEvaluationCriteria action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RestoreEvaluationCriteriaActionParameters {
  msdyn_CriteriaId: string;
  msdyn_CriteriaVersionId: string;
}

/**
 * msdyn_RestoreEvaluationCriteria action
 *
 * Unbound action
 */
export class msdyn_RestoreEvaluationCriteriaAction implements Executable<msdyn_RestoreEvaluationCriteriaResponse> {
  constructor(public readonly parameters: msdyn_RestoreEvaluationCriteriaActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RestoreEvaluationCriteria`;

    const body = requestBody({
      msdyn_CriteriaId: this.parameters.msdyn_CriteriaId,
      msdyn_CriteriaVersionId: this.parameters.msdyn_CriteriaVersionId,
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

  async parseResponse(response: Response): Promise<msdyn_RestoreEvaluationCriteriaResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RestoreEvaluationCriteriaResponse;
  }
}
