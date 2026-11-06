import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_OSGetPredictionModelStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OSGetPredictionModelStatusResponse {
  "@odata.context"?: string;
  PredictionModelStatus: string;
}

/**
 * Parameters of the msdyn_OSGetPredictionModelStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSGetPredictionModelStatusActionParameters {
  PredictionName?: string;
}

/**
 * msdyn_OSGetPredictionModelStatus action
 *
 * Unbound action
 */
export class msdyn_OSGetPredictionModelStatusAction implements Executable<msdyn_OSGetPredictionModelStatusResponse> {
  constructor(public readonly parameters: msdyn_OSGetPredictionModelStatusActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSGetPredictionModelStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_OSGetPredictionModelStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_OSGetPredictionModelStatusResponse;
  }
}
