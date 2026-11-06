import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_createevaluationplanbatch action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_createevaluationplanbatchResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_createevaluationplanbatchResponse;
  }
}
