import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SyncODOSProvisioningStatus request message
 *
 * Web API Action: msdyn_SyncODOSProvisioningStatus
 */
export class msdyn_SyncODOSProvisioningStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SyncODOSProvisioningStatusResponse>
{
  constructor(public inputData: string) {
    super("msdyn_SyncODOSProvisioningStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncODOSProvisioningStatus`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_SyncODOSProvisioningStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_SyncODOSProvisioningStatusResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
  }
}

/**
 * msdyn_SyncODOSProvisioningStatus response message
 */
export class msdyn_SyncODOSProvisioningStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SyncODOSProvisioningStatus");
  }

  static fromResponse(_data: unknown): msdyn_SyncODOSProvisioningStatusResponse {
    return new msdyn_SyncODOSProvisioningStatusResponse();
  }
}
