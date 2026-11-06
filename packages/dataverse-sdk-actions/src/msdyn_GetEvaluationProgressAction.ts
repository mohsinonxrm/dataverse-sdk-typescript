import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetEvaluationProgress action
 */
export interface msdyn_GetEvaluationProgressResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetEvaluationProgressResponse;
    return (await response.json()) as msdyn_GetEvaluationProgressResponse;
  }
}
