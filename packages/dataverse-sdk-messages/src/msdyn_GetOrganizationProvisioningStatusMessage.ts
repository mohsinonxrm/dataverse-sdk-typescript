import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetOrganizationProvisioningStatus request message
 *
 * Web API Action: msdyn_GetOrganizationProvisioningStatus
 */
export class msdyn_GetOrganizationProvisioningStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOrganizationProvisioningStatusResponse>
{
  constructor() {
    super("msdyn_GetOrganizationProvisioningStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrganizationProvisioningStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetOrganizationProvisioningStatusResponse> {
    const data = await response.json();
    return msdyn_GetOrganizationProvisioningStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetOrganizationProvisioningStatus response message
 */
export class msdyn_GetOrganizationProvisioningStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrganizationProvisioningStatusResponse) {
    super("msdyn_GetOrganizationProvisioningStatus");
  }

  static fromResponse(data: unknown): msdyn_GetOrganizationProvisioningStatusResponse {
    return new msdyn_GetOrganizationProvisioningStatusResponse((data as any).value);
  }
}
