import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IoTHubPullDeviceData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTHubPullDeviceDataRequestParameters {
  EntityCollection?: Record<string, unknown>[];
}

/**
 * msdyn_IoTHubPullDeviceData request message
 *
 * Web API Action: msdyn_IoTHubPullDeviceData
 */
export class msdyn_IoTHubPullDeviceDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTHubPullDeviceDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTHubPullDeviceDataRequestParameters>;

  constructor(parameters: msdyn_IoTHubPullDeviceDataRequestParameters = {}) {
    super("msdyn_IoTHubPullDeviceData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubPullDeviceData`;

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

  async parseResponse(response: Response): Promise<msdyn_IoTHubPullDeviceDataResponse> {
    // No return value (204 No Content)
    return new msdyn_IoTHubPullDeviceDataResponse();
  }
}

/**
 * msdyn_IoTHubPullDeviceData response message
 */
export class msdyn_IoTHubPullDeviceDataResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_IoTHubPullDeviceData");
  }

  static fromResponse(_data: unknown): msdyn_IoTHubPullDeviceDataResponse {
    return new msdyn_IoTHubPullDeviceDataResponse();
  }
}
