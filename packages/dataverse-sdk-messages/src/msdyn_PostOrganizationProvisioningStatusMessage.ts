import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PostOrganizationProvisioningStatus request message
 *
 * Web API Action: msdyn_PostOrganizationProvisioningStatus
 */
export class msdyn_PostOrganizationProvisioningStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_PostOrganizationProvisioningStatusResponse>
{
  constructor(
    public autoCaptureSettings: string,
    public autoCaptureRules: string,
    public orgProvisioningDetails: string
  ) {
    super("msdyn_PostOrganizationProvisioningStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostOrganizationProvisioningStatus`;

    const body: Record<string, unknown> = {
      autoCaptureSettings: this.autoCaptureSettings,
      autoCaptureRules: this.autoCaptureRules,
      orgProvisioningDetails: this.orgProvisioningDetails,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_PostOrganizationProvisioningStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_PostOrganizationProvisioningStatusResponse();
  }
}

/**
 * msdyn_PostOrganizationProvisioningStatus response message
 */
export class msdyn_PostOrganizationProvisioningStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PostOrganizationProvisioningStatus");
  }

  static fromResponse(_data: unknown): msdyn_PostOrganizationProvisioningStatusResponse {
    return new msdyn_PostOrganizationProvisioningStatusResponse();
  }
}
