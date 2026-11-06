import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetEvaluationProgress action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetEvaluationProgressResponse {
  "@odata.context"?: string;
  status: string;
}

/**
 * Parameters of the msdyn_GetEvaluationProgress action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEvaluationProgressActionParameters {
  recordId: string;
}

/**
 * msdyn_GetEvaluationProgress action
 *
 * Unbound action
 */
export class msdyn_GetEvaluationProgressAction implements Executable<msdyn_GetEvaluationProgressResponse> {
  constructor(public readonly parameters: msdyn_GetEvaluationProgressActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEvaluationProgress`;

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

  async parseResponse(response: Response): Promise<msdyn_GetEvaluationProgressResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetEvaluationProgressResponse;
  }
}
