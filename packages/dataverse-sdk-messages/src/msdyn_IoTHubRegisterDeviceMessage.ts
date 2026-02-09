import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTHubRegisterDevice request message
 *
 * Web API Action: msdyn_IoTHubRegisterDevice
 */
export class msdyn_IoTHubRegisterDeviceRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTHubRegisterDeviceResponse>
{
  constructor(public entityCollection: Record<string, unknown>[]) {
    super("msdyn_IoTHubRegisterDevice");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubRegisterDevice`;

    const body: Record<string, unknown> = {
      EntityCollection: this.entityCollection,
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

  async parseResponse(response: Response): Promise<msdyn_IoTHubRegisterDeviceResponse> {
    // No return value (204 No Content)
    return new msdyn_IoTHubRegisterDeviceResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityCollection: this.entityCollection,
    };
  }
}

/**
 * msdyn_IoTHubRegisterDevice response message
 */
export class msdyn_IoTHubRegisterDeviceResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_IoTHubRegisterDevice");
  }

  static fromResponse(_data: unknown): msdyn_IoTHubRegisterDeviceResponse {
    return new msdyn_IoTHubRegisterDeviceResponse();
  }
}
