import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIoTDeviceCategoryOfDeviceResponse> {
    const data = await response.json();
    return msdyn_CheckIoTDeviceCategoryOfDeviceResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIoTDeviceCategoryOfDevice response message
 */
export class msdyn_CheckIoTDeviceCategoryOfDeviceResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIoTDeviceCategoryOfDeviceResponse) {
    super("msdyn_CheckIoTDeviceCategoryOfDevice");
  }

  static fromResponse(data: unknown): msdyn_CheckIoTDeviceCategoryOfDeviceResponse {
    return new msdyn_CheckIoTDeviceCategoryOfDeviceResponse((data as any).value);
  }
}
