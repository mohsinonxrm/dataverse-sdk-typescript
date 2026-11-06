import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_retryevaluation action
 */
export interface msdyn_retryevaluationResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_retryevaluation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_retryevaluationActionParameters {
  msdyn_ExpirationDate: string;
}

/**
 * msdyn_retryevaluation action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_evaluation)
 *
 * The first argument is the id of the msdyn_evaluation record to call it on.
 */
export class msdyn_retryevaluationAction implements Executable<msdyn_retryevaluationResponse> {
  constructor(
    public readonly msdyn_evaluationId: string,
    public readonly parameters: msdyn_retryevaluationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_evaluations(${this.msdyn_evaluationId})/Microsoft.Dynamics.CRM.msdyn_retryevaluation`;

    const body = requestBody({
      msdyn_ExpirationDate: this.parameters.msdyn_ExpirationDate,
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

  async parseResponse(response: Response): Promise<msdyn_retryevaluationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_retryevaluationResponse;
    return (await response.json()) as msdyn_retryevaluationResponse;
  }
}
