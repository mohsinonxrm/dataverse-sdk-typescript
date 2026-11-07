import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AIEvaluationMetricsWrapper action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AIEvaluationMetricsWrapperResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the msdyn_AIEvaluationMetricsWrapper action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AIEvaluationMetricsWrapperActionParameters {
  request: string;
}

/**
 * msdyn_AIEvaluationMetricsWrapper action
 *
 * Unbound action
 */
export class msdyn_AIEvaluationMetricsWrapperAction implements Executable<msdyn_AIEvaluationMetricsWrapperResponse> {
  constructor(public readonly parameters: msdyn_AIEvaluationMetricsWrapperActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIEvaluationMetricsWrapper`;

    const body = requestBody({
      request: this.parameters.request,
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

  async parseResponse(response: Response): Promise<msdyn_AIEvaluationMetricsWrapperResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_AIEvaluationMetricsWrapperResponse;
  }
}
