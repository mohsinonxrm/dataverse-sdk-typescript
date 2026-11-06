import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ForecastApi action
 */
export interface msdyn_ForecastApiResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ForecastApiResponse;
  }
}
