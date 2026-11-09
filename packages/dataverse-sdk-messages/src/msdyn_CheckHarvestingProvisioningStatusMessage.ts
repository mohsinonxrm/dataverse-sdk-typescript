import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckHarvestingProvisioningStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckHarvestingProvisioningStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckHarvestingProvisioningStatusResult {
  "@odata.context"?: string;
  HarvestingProvisioningStatus: string;
}

/**
 * msdyn_CheckHarvestingProvisioningStatus response message
 *
 * `result` is the value the msdyn_CheckHarvestingProvisioningStatus action returns (see {@link msdyn_CheckHarvestingProvisioningStatusResult}).
 */
export class msdyn_CheckHarvestingProvisioningStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckHarvestingProvisioningStatusResult) {
    super("msdyn_CheckHarvestingProvisioningStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckHarvestingProvisioningStatusResponse {
    return new msdyn_CheckHarvestingProvisioningStatusResponse(
      data as msdyn_CheckHarvestingProvisioningStatusResult
    );
  }
}
