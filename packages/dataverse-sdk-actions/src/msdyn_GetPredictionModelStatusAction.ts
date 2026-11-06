import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetPredictionModelStatus action
 */
export interface msdyn_GetPredictionModelStatusResponse {
  PredictionModelStatus: string;
}

/**
 * Parameters of the msdyn_GetPredictionModelStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetPredictionModelStatusActionParameters {
  PredictionName?: string;
}

/**
 * msdyn_GetPredictionModelStatus action
 *
 * Unbound action
 */
export class msdyn_GetPredictionModelStatusAction implements Executable<msdyn_GetPredictionModelStatusResponse> {
  constructor(public readonly parameters: msdyn_GetPredictionModelStatusActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPredictionModelStatus`;

    const body = requestBody({
      PredictionName: this.parameters.PredictionName,
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

  async parseResponse(response: Response): Promise<msdyn_GetPredictionModelStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetPredictionModelStatusResponse;
    return (await response.json()) as msdyn_GetPredictionModelStatusResponse;
  }
}
