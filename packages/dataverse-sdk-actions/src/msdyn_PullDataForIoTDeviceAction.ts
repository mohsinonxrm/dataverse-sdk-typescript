import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_PullDataForIoTDevice action
 */
export interface msdyn_PullDataForIoTDeviceResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_PullDataForIoTDevice action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PullDataForIoTDeviceActionParameters {
  IsScheduledDataPull?: boolean;
  IoTDeviceIds?: string;
}

/**
 * msdyn_PullDataForIoTDevice action
 *
 * Unbound action
 */
export class msdyn_PullDataForIoTDeviceAction implements Executable<msdyn_PullDataForIoTDeviceResponse> {
  constructor(public readonly parameters: msdyn_PullDataForIoTDeviceActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PullDataForIoTDevice`;

    const body = requestBody({
      IsScheduledDataPull: this.parameters.IsScheduledDataPull,
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

  async parseResponse(response: Response): Promise<msdyn_PullDataForIoTDeviceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_PullDataForIoTDeviceResponse;
    return (await response.json()) as msdyn_PullDataForIoTDeviceResponse;
  }
}
