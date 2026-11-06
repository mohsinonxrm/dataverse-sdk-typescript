import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetRIProvisioningStatusResponse as msdyn_GetRIProvisioningStatusResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetRIProvisioningStatusResponse.fromResponse({});
    return msdyn_GetRIProvisioningStatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetRIProvisioningStatus response message
 */
export class msdyn_GetRIProvisioningStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRIProvisioningStatusResponseData) {
    super("msdyn_GetRIProvisioningStatus");
  }

  static fromResponse(data: unknown): msdyn_GetRIProvisioningStatusResponse {
    return new msdyn_GetRIProvisioningStatusResponse(
      responseObject<msdyn_GetRIProvisioningStatusResponseData>(data)
    );
  }
}
