import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IoTSendTestAlert action
 */
export interface msdyn_IoTSendTestAlertResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_IoTSendTestAlert action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTSendTestAlertActionParameters {
  IoTDeviceIds: string;
}

/**
 * msdyn_IoTSendTestAlert action
 *
 * Unbound action
 */
export class msdyn_IoTSendTestAlertAction implements Executable<msdyn_IoTSendTestAlertResponse> {
  constructor(public readonly parameters: msdyn_IoTSendTestAlertActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTSendTestAlert`;

    const body = requestBody({
      IoTDeviceIds: this.parameters.IoTDeviceIds,
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

  async parseResponse(response: Response): Promise<msdyn_IoTSendTestAlertResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_IoTSendTestAlertResponse;
    return (await response.json()) as msdyn_IoTSendTestAlertResponse;
  }
}
