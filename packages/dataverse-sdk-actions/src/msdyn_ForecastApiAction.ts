import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ForecastApi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ForecastApiResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the msdyn_ForecastApi action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ForecastApiActionParameters {
  WebApiName: string;
  RequestJson?: string;
}

/**
 * msdyn_ForecastApi action
 *
 * Unbound action
 */
export class msdyn_ForecastApiAction implements Executable<msdyn_ForecastApiResponse> {
  constructor(public readonly parameters: msdyn_ForecastApiActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastApi`;

    const body = requestBody({
      WebApiName: this.parameters.WebApiName,
      RequestJson: this.parameters.RequestJson,
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

  async parseResponse(response: Response): Promise<msdyn_ForecastApiResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ForecastApiResponse;
  }
}
