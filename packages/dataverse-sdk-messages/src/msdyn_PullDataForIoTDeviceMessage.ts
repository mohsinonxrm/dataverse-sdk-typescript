import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_PullDataForIoTDevice message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PullDataForIoTDeviceRequestParameters {
  IsScheduledDataPull?: boolean;
  IoTDeviceIds?: string;
}

/**
 * msdyn_PullDataForIoTDevice request message
 *
 * Web API Action: msdyn_PullDataForIoTDevice
 */
export class msdyn_PullDataForIoTDeviceRequest
  extends OrganizationRequest
  implements Executable<msdyn_PullDataForIoTDeviceResponse>
{
  declare readonly Parameters: Readonly<msdyn_PullDataForIoTDeviceRequestParameters>;

  constructor(parameters: msdyn_PullDataForIoTDeviceRequestParameters = {}) {
    super("msdyn_PullDataForIoTDevice", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PullDataForIoTDevice`;

    const body = requestBody({
      IsScheduledDataPull: this.Parameters.IsScheduledDataPull,
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

  async parseResponse(response: Response): Promise<msdyn_PullDataForIoTDeviceResponse> {
    // No return value (204 No Content)
    return new msdyn_PullDataForIoTDeviceResponse();
  }
}

/**
 * msdyn_PullDataForIoTDevice response message
 */
export class msdyn_PullDataForIoTDeviceResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PullDataForIoTDevice");
  }

  static fromResponse(_data: unknown): msdyn_PullDataForIoTDeviceResponse {
    return new msdyn_PullDataForIoTDeviceResponse();
  }
}
