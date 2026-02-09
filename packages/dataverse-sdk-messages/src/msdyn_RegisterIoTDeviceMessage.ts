import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RegisterIoTDevice request message
 *
 * Web API Action: msdyn_RegisterIoTDevice
 */
export class msdyn_RegisterIoTDeviceRequest
  extends OrganizationRequest
  implements Executable<msdyn_RegisterIoTDeviceResponse>
{
  constructor(public ioTDeviceIds: string) {
    super("msdyn_RegisterIoTDevice");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RegisterIoTDevice`;

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

  async parseResponse(response: Response): Promise<msdyn_RegisterIoTDeviceResponse> {
    // No return value (204 No Content)
    return new msdyn_RegisterIoTDeviceResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      IoTDeviceIds: this.ioTDeviceIds,
    };
  }
}

/**
 * msdyn_RegisterIoTDevice response message
 */
export class msdyn_RegisterIoTDeviceResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_RegisterIoTDevice");
  }

  static fromResponse(_data: unknown): msdyn_RegisterIoTDeviceResponse {
    return new msdyn_RegisterIoTDeviceResponse();
  }
}
