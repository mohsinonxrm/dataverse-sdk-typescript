import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PullDataForIoTDevice request message
 *
 * Web API Action: msdyn_PullDataForIoTDevice
 */
export class msdyn_PullDataForIoTDeviceRequest
  extends OrganizationRequest
  implements Executable<msdyn_PullDataForIoTDeviceResponse>
{
  constructor(
    public isScheduledDataPull?: boolean,
    public ioTDeviceIds?: string
  ) {
    super("msdyn_PullDataForIoTDevice");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PullDataForIoTDevice`;

    const body: Record<string, unknown> = {
      IsScheduledDataPull: this.isScheduledDataPull,
      IoTDeviceIds: this.ioTDeviceIds,
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
