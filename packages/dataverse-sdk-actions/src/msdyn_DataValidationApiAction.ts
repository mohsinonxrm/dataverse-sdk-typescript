import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_DataValidationApi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DataValidationApiResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_DataValidationApi action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DataValidationApiActionParameters {
  ApiType: number;
  ApiPayLoad?: string;
}

/**
 * msdyn_DataValidationApi action
 *
 * Unbound action
 */
export class msdyn_DataValidationApiAction implements Executable<msdyn_DataValidationApiResponse> {
  constructor(public readonly parameters: msdyn_DataValidationApiActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DataValidationApi`;

    const body = requestBody({
      ApiType: this.parameters.ApiType,
      ApiPayLoad: this.parameters.ApiPayLoad,
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

  async parseResponse(response: Response): Promise<msdyn_DataValidationApiResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_DataValidationApiResponse;
  }
}
