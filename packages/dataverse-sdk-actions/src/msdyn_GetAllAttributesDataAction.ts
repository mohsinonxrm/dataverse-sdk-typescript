import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetAllAttributesData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAllAttributesDataResponse {
  "@odata.context"?: string;
  Response: string;
}

/**
 * Parameters of the msdyn_GetAllAttributesData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAllAttributesDataActionParameters {
  PredictionName: string;
  PredictionType: string;
}

/**
 * msdyn_GetAllAttributesData action
 *
 * Unbound action
 */
export class msdyn_GetAllAttributesDataAction implements Executable<msdyn_GetAllAttributesDataResponse> {
  constructor(public readonly parameters: msdyn_GetAllAttributesDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllAttributesData`;

    const body = requestBody({
      PredictionName: this.parameters.PredictionName,
      PredictionType: this.parameters.PredictionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAllAttributesDataResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAllAttributesDataResponse;
  }
}
