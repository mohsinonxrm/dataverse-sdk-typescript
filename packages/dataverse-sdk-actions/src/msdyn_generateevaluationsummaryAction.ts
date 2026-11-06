import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_generateevaluationsummary action
 */
export interface msdyn_generateevaluationsummaryResponse {
  actionPlan: string;
  evaluationSummary: string;
  status: string;
}

/**
 * Parameters of the msdyn_generateevaluationsummary action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_generateevaluationsummaryActionParameters {
  evaluationId: string;
}

/**
 * msdyn_generateevaluationsummary action
 *
 * Unbound action
 */
export class msdyn_generateevaluationsummaryAction implements Executable<msdyn_generateevaluationsummaryResponse> {
  constructor(public readonly parameters: msdyn_generateevaluationsummaryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_generateevaluationsummary`;

    const body = requestBody({
      evaluationId: this.parameters.evaluationId,
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

  async parseResponse(response: Response): Promise<msdyn_generateevaluationsummaryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_generateevaluationsummaryResponse;
    return (await response.json()) as msdyn_generateevaluationsummaryResponse;
  }
}
