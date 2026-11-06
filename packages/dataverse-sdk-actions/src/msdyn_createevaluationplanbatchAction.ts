import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_createevaluationplanbatch action
 */
export interface msdyn_createevaluationplanbatchResponse {
  Status: boolean;
}

/**
 * Parameters of the msdyn_createevaluationplanbatch action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_createevaluationplanbatchActionParameters {
  EvaluationPlanRunId: string;
}

/**
 * msdyn_createevaluationplanbatch action
 *
 * Unbound action
 */
export class msdyn_createevaluationplanbatchAction implements Executable<msdyn_createevaluationplanbatchResponse> {
  constructor(public readonly parameters: msdyn_createevaluationplanbatchActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_createevaluationplanbatch`;

    const body = requestBody({
      EvaluationPlanRunId: this.parameters.EvaluationPlanRunId,
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

  async parseResponse(response: Response): Promise<msdyn_createevaluationplanbatchResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_createevaluationplanbatchResponse;
  }
}
