import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TrainEffortModel action
 */
export interface msdyn_TrainEffortModelResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_TrainEffortModel action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TrainEffortModelActionParameters {
  TrainConfig: string;
}

/**
 * msdyn_TrainEffortModel action
 *
 * Unbound action
 */
export class msdyn_TrainEffortModelAction implements Executable<msdyn_TrainEffortModelResponse> {
  constructor(public readonly parameters: msdyn_TrainEffortModelActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TrainEffortModel`;

    const body = requestBody({
      TrainConfig: this.parameters.TrainConfig,
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

  async parseResponse(response: Response): Promise<msdyn_TrainEffortModelResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_TrainEffortModelResponse;
  }
}
