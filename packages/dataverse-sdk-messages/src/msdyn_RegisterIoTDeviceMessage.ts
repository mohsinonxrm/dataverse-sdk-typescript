import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RegisterIoTDevice message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RegisterIoTDeviceRequestParameters {
  IoTDeviceIds: string;
}

/**
 * msdyn_RegisterIoTDevice request message
 *
 * Web API Action: msdyn_RegisterIoTDevice
 */
export class msdyn_RegisterIoTDeviceRequest
  extends OrganizationRequest
  implements Executable<msdyn_RegisterIoTDeviceResponse>
{
  declare readonly Parameters: Readonly<msdyn_RegisterIoTDeviceRequestParameters>;

  constructor(parameters: msdyn_RegisterIoTDeviceRequestParameters) {
    super("msdyn_RegisterIoTDevice", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RegisterIoTDevice`;

    const body = requestBody({
      IoTDeviceIds: this.Parameters.IoTDeviceIds,
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

  parseResponse(_response: Response): Promise<msdyn_RegisterIoTDeviceResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_RegisterIoTDeviceResponse());
  }
}

/**
 * msdyn_RegisterIoTDevice response message
 */
export class msdyn_RegisterIoTDeviceResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_RegisterIoTDevice");
  }

  static fromResponse(_data?: unknown): msdyn_RegisterIoTDeviceResponse {
    return new msdyn_RegisterIoTDeviceResponse();
  }
}
