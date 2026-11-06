import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_updateevaluationdetails action
 */
export interface msdyn_updateevaluationdetailsResponse {
  msdyn_updatestatus: boolean;
}

/**
 * Parameters of the msdyn_updateevaluationdetails action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_updateevaluationdetailsActionParameters {
  msdyn_evaluationdetails: string;
}

/**
 * msdyn_updateevaluationdetails action
 *
 * Unbound action
 */
export class msdyn_updateevaluationdetailsAction implements Executable<msdyn_updateevaluationdetailsResponse> {
  constructor(public readonly parameters: msdyn_updateevaluationdetailsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updateevaluationdetails`;

    const body = requestBody({
      msdyn_evaluationdetails: this.parameters.msdyn_evaluationdetails,
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

  async parseResponse(response: Response): Promise<msdyn_updateevaluationdetailsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_updateevaluationdetailsResponse;
    return (await response.json()) as msdyn_updateevaluationdetailsResponse;
  }
}
