import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IoTHubRegisterDevice message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTHubRegisterDeviceRequestParameters {
  EntityCollection?: Record<string, unknown>[];
}

/**
 * msdyn_IoTHubRegisterDevice request message
 *
 * Web API Action: msdyn_IoTHubRegisterDevice
 */
export class msdyn_IoTHubRegisterDeviceRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTHubRegisterDeviceResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTHubRegisterDeviceRequestParameters>;

  constructor(parameters: msdyn_IoTHubRegisterDeviceRequestParameters = {}) {
    super("msdyn_IoTHubRegisterDevice", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubRegisterDevice`;

    const body = requestBody({
      EntityCollection: this.Parameters.EntityCollection,
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

  async parseResponse(response: Response): Promise<msdyn_IoTHubRegisterDeviceResponse> {
    // No return value (204 No Content)
    return new msdyn_IoTHubRegisterDeviceResponse();
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
