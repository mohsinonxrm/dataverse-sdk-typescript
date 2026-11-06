import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CancelEvaluation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CancelEvaluationResponse {
  "@odata.context"?: string;
  status: string;
}

/**
 * Parameters of the msdyn_CancelEvaluation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CancelEvaluationActionParameters {
  recordId: string;
}

/**
 * msdyn_CancelEvaluation action
 *
 * Unbound action
 */
export class msdyn_CancelEvaluationAction implements Executable<msdyn_CancelEvaluationResponse> {
  constructor(public readonly parameters: msdyn_CancelEvaluationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelEvaluation`;

    const body = requestBody({
      recordId: this.parameters.recordId,
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

  async parseResponse(response: Response): Promise<msdyn_CancelEvaluationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CancelEvaluationResponse;
  }
}
