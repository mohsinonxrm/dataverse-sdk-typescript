import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTHubPullDeviceData request message
 *
 * Web API Action: msdyn_IoTHubPullDeviceData
 */
export class msdyn_IoTHubPullDeviceDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTHubPullDeviceDataResponse>
{
  constructor(public entityCollection: Record<string, unknown>[]) {
    super("msdyn_IoTHubPullDeviceData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTHubPullDeviceData`;

    const body: Record<string, unknown> = {
      EntityCollection: this.entityCollection,
    };

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
