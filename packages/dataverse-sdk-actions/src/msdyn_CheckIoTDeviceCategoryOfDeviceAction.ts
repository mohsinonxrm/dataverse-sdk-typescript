import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIoTDeviceCategoryOfDevice action
 */
export interface msdyn_CheckIoTDeviceCategoryOfDeviceResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_CheckIoTDeviceCategoryOfDevice action
 *
 * Unbound action
 */
export class msdyn_CheckIoTDeviceCategoryOfDeviceAction implements Executable<msdyn_CheckIoTDeviceCategoryOfDeviceResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIoTDeviceCategoryOfDevice`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIoTDeviceCategoryOfDeviceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIoTDeviceCategoryOfDeviceResponse;
  }
}
