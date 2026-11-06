import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_PostOrganizationProvisioningStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PostOrganizationProvisioningStatusRequestParameters {
  autoCaptureSettings: string;
  autoCaptureRules: string;
  orgProvisioningDetails: string;
}

/**
 * msdyn_PostOrganizationProvisioningStatus request message
 *
 * Web API Action: msdyn_PostOrganizationProvisioningStatus
 */
export class msdyn_PostOrganizationProvisioningStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_PostOrganizationProvisioningStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_PostOrganizationProvisioningStatusRequestParameters>;

  constructor(parameters: msdyn_PostOrganizationProvisioningStatusRequestParameters) {
    super("msdyn_PostOrganizationProvisioningStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostOrganizationProvisioningStatus`;

    const body = requestBody({
      autoCaptureSettings: this.Parameters.autoCaptureSettings,
      autoCaptureRules: this.Parameters.autoCaptureRules,
      orgProvisioningDetails: this.Parameters.orgProvisioningDetails,
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
