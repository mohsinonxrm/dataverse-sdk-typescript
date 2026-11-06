import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ForecastInstanceActions action
 */
export interface msdyn_ForecastInstanceActionsResponse {
  response: string;
}

/**
 * Parameters of the msdyn_ForecastInstanceActions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ForecastInstanceActionsActionParameters {
  ServiceName: string;
  WebApiName?: string;
  RequestJson: string;
}

/**
 * msdyn_ForecastInstanceActions action
 *
 * Unbound action
 */
export class msdyn_ForecastInstanceActionsAction implements Executable<msdyn_ForecastInstanceActionsResponse> {
  constructor(public readonly parameters: msdyn_ForecastInstanceActionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastInstanceActions`;

    const body = requestBody({
      ServiceName: this.parameters.ServiceName,
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

  async parseResponse(response: Response): Promise<msdyn_ForecastInstanceActionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ForecastInstanceActionsResponse;
    return (await response.json()) as msdyn_ForecastInstanceActionsResponse;
  }
}
