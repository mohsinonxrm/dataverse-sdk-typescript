import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SendMessageToOCService action
 */
export interface msdyn_SendMessageToOCServiceResponse {
  ResponseBody: string;
}

/**
 * Parameters of the msdyn_SendMessageToOCService action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendMessageToOCServiceActionParameters {
  ServiceEndPoint: string;
  RequestBody: string;
}

/**
 * msdyn_SendMessageToOCService action
 *
 * Unbound action
 */
export class msdyn_SendMessageToOCServiceAction implements Executable<msdyn_SendMessageToOCServiceResponse> {
  constructor(public readonly parameters: msdyn_SendMessageToOCServiceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendMessageToOCService`;

    const body = requestBody({
      ServiceEndPoint: this.parameters.ServiceEndPoint,
      RequestBody: this.parameters.RequestBody,
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

  async parseResponse(response: Response): Promise<msdyn_SendMessageToOCServiceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SendMessageToOCServiceResponse;
    return (await response.json()) as msdyn_SendMessageToOCServiceResponse;
  }
}
