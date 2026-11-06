import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IoTSendTestAlert message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTSendTestAlertRequestParameters {
  IoTDeviceIds: string;
}

/**
 * msdyn_IoTSendTestAlert request message
 *
 * Web API Action: msdyn_IoTSendTestAlert
 */
export class msdyn_IoTSendTestAlertRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTSendTestAlertResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTSendTestAlertRequestParameters>;

  constructor(parameters: msdyn_IoTSendTestAlertRequestParameters) {
    super("msdyn_IoTSendTestAlert", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTSendTestAlert`;

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
