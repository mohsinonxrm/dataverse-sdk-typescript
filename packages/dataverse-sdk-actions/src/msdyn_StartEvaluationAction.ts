import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_StartEvaluation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_StartEvaluationResponse {
  "@odata.context"?: string;
  jobId: string;
}

/**
 * Parameters of the msdyn_StartEvaluation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_StartEvaluationActionParameters {
  recordId: string;
}

/**
 * msdyn_StartEvaluation action
 *
 * Unbound action
 */
export class msdyn_StartEvaluationAction implements Executable<msdyn_StartEvaluationResponse> {
  constructor(public readonly parameters: msdyn_StartEvaluationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartEvaluation`;

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

  async parseResponse(response: Response): Promise<msdyn_StartEvaluationResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_StartEvaluationResponse;
  }
}
