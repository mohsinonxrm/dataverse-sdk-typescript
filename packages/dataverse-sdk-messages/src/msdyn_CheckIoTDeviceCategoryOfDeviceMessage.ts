import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIoTDeviceCategoryOfDeviceResponse as msdyn_CheckIoTDeviceCategoryOfDeviceResponseData } from "./types/index.js";

/**
 * msdyn_CheckIoTDeviceCategoryOfDevice request message
 *
 * Web API Action: msdyn_CheckIoTDeviceCategoryOfDevice
 */
export class msdyn_CheckIoTDeviceCategoryOfDeviceRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIoTDeviceCategoryOfDeviceResponse>
{
  constructor() {
    super("msdyn_CheckIoTDeviceCategoryOfDevice");
  }

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
    return msdyn_CheckIoTDeviceCategoryOfDeviceResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CheckIoTDeviceCategoryOfDevice response message
 */
export class msdyn_CheckIoTDeviceCategoryOfDeviceResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIoTDeviceCategoryOfDeviceResponseData) {
    super("msdyn_CheckIoTDeviceCategoryOfDevice");
  }

  static fromResponse(data: unknown): msdyn_CheckIoTDeviceCategoryOfDeviceResponse {
    return new msdyn_CheckIoTDeviceCategoryOfDeviceResponse(
      responseObject<msdyn_CheckIoTDeviceCategoryOfDeviceResponseData>(data)
    );
  }
}
