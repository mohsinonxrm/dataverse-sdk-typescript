import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckHarvestingProvisioningStatusResponse as msdyn_CheckHarvestingProvisioningStatusResponseData } from "./types/index.js";

/**
 * msdyn_CheckHarvestingProvisioningStatus request message
 *
 * Web API Action: msdyn_CheckHarvestingProvisioningStatus
 */
export class msdyn_CheckHarvestingProvisioningStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckHarvestingProvisioningStatusResponse>
{
  constructor() {
    super("msdyn_CheckHarvestingProvisioningStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckHarvestingProvisioningStatus`;

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
  ): Promise<msdyn_CheckHarvestingProvisioningStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckHarvestingProvisioningStatusResponse.fromResponse({});
    return msdyn_CheckHarvestingProvisioningStatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckHarvestingProvisioningStatus response message
 */
export class msdyn_CheckHarvestingProvisioningStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckHarvestingProvisioningStatusResponseData) {
    super("msdyn_CheckHarvestingProvisioningStatus");
  }

  static fromResponse(data: unknown): msdyn_CheckHarvestingProvisioningStatusResponse {
    return new msdyn_CheckHarvestingProvisioningStatusResponse(
      responseObject<msdyn_CheckHarvestingProvisioningStatusResponseData>(data)
    );
  }
}
