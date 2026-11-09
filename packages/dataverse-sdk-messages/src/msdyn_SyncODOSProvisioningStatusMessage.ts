import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SyncODOSProvisioningStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SyncODOSProvisioningStatusRequestParameters {
  InputData: string;
}

/**
 * msdyn_SyncODOSProvisioningStatus request message
 *
 * Web API Action: msdyn_SyncODOSProvisioningStatus
 */
export class msdyn_SyncODOSProvisioningStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SyncODOSProvisioningStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SyncODOSProvisioningStatusRequestParameters>;

  constructor(parameters: msdyn_SyncODOSProvisioningStatusRequestParameters) {
    super("msdyn_SyncODOSProvisioningStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncODOSProvisioningStatus`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  parseResponse(_response: Response): Promise<msdyn_SyncODOSProvisioningStatusResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_SyncODOSProvisioningStatusResponse());
  }
}

/**
 * msdyn_SyncODOSProvisioningStatus response message
 */
export class msdyn_SyncODOSProvisioningStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SyncODOSProvisioningStatus");
  }

  static fromResponse(_data?: unknown): msdyn_SyncODOSProvisioningStatusResponse {
    return new msdyn_SyncODOSProvisioningStatusResponse();
  }
}
