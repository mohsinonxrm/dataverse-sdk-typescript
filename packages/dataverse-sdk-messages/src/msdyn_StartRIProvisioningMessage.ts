import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_StartRIProvisioning request message
 *
 * Web API Action: msdyn_StartRIProvisioning
 */
export class msdyn_StartRIProvisioningRequest
  extends OrganizationRequest
  implements Executable<msdyn_StartRIProvisioningResponse>
{
  constructor(
    public hubName?: string,
    public primaryKey?: string
  ) {
    super("msdyn_StartRIProvisioning");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_StartRIProvisioning`;

    const body: Record<string, unknown> = {
      HubName: this.hubName,
      PrimaryKey: this.primaryKey,
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

  async parseResponse(response: Response): Promise<msdyn_StartRIProvisioningResponse> {
    // No return value (204 No Content)
    return new msdyn_StartRIProvisioningResponse();
  }
}

/**
 * msdyn_StartRIProvisioning response message
 */
export class msdyn_StartRIProvisioningResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_StartRIProvisioning");
  }

  static fromResponse(_data: unknown): msdyn_StartRIProvisioningResponse {
    return new msdyn_StartRIProvisioningResponse();
  }
}
