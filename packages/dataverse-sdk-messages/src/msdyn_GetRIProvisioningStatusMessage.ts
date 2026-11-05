import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetRIProvisioningStatus request message
 *
 * Web API Action: msdyn_GetRIProvisioningStatus
 */
export class msdyn_GetRIProvisioningStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRIProvisioningStatusResponse>
{
  constructor() {
    super("msdyn_GetRIProvisioningStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRIProvisioningStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetRIProvisioningStatusResponse> {
    const data = await response.json();
    return msdyn_GetRIProvisioningStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetRIProvisioningStatus response message
 */
export class msdyn_GetRIProvisioningStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRIProvisioningStatusResponse) {
    super("msdyn_GetRIProvisioningStatus");
  }

  static fromResponse(data: unknown): msdyn_GetRIProvisioningStatusResponse {
    return new msdyn_GetRIProvisioningStatusResponse((data as any).value);
  }
}
