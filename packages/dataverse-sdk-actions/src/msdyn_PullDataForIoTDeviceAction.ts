import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_PullDataForIoTDevice action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_PullDataForIoTDeviceResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_PullDataForIoTDeviceResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
