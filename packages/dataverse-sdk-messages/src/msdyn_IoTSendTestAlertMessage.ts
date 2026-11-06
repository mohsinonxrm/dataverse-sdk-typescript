import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IoTSendTestAlert request message
 *
 * Web API Action: msdyn_IoTSendTestAlert
 */
export class msdyn_IoTSendTestAlertRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTSendTestAlertResponse>
{
  constructor(public ioTDeviceIds: string) {
    super("msdyn_IoTSendTestAlert");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTSendTestAlert`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<msdyn_IoTSendTestAlertResponse> {
    // No return value (204 No Content)
    return new msdyn_IoTSendTestAlertResponse();
  }
}

/**
 * msdyn_IoTSendTestAlert response message
 */
export class msdyn_IoTSendTestAlertResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_IoTSendTestAlert");
  }

  static fromResponse(_data: unknown): msdyn_IoTSendTestAlertResponse {
    return new msdyn_IoTSendTestAlertResponse();
  }
}
