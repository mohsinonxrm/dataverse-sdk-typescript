import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTSendTestAlert action
 */
export interface msdyn_IoTSendTestAlertResponse {
  // No content returned
}

/**
 * msdyn_IoTSendTestAlert action
 *
 * Unbound action
 */
export class msdyn_IoTSendTestAlertAction implements Executable<msdyn_IoTSendTestAlertResponse> {
  constructor(public readonly ioTDeviceIds: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTSendTestAlert`;

    const body: Record<string, unknown> = {
      IoTDeviceIds: this.ioTDeviceIds,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IoTSendTestAlertResponse> {
    // No return value (204 No Content)
    return {};
  }
}
