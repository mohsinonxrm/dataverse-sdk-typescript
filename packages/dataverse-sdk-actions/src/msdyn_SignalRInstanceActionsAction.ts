import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SignalRInstanceActions action
 */
export interface msdyn_SignalRInstanceActionsResponse {
  response: string;
}

/**
 * Parameters of the msdyn_SignalRInstanceActions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SignalRInstanceActionsActionParameters {
  ServiceName: string;
  WebApiName: string;
  RequestJson: string;
}

/**
 * msdyn_SignalRInstanceActions action
 *
 * Unbound action
 */
export class msdyn_SignalRInstanceActionsAction implements Executable<msdyn_SignalRInstanceActionsResponse> {
  constructor(public readonly parameters: msdyn_SignalRInstanceActionsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SignalRInstanceActions`;

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

  async parseResponse(response: Response): Promise<msdyn_SignalRInstanceActionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SignalRInstanceActionsResponse;
    return (await response.json()) as msdyn_SignalRInstanceActionsResponse;
  }
}
