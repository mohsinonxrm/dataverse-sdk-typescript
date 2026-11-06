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
    // The body is the complex value, with its @odata.context
    return msdyn_GetOrganizationProvisioningStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetOrganizationProvisioningStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOrganizationProvisioningStatusResult {
  "@odata.context"?: string;
  OrgProvisioningStatus: string;
}

/**
 * msdyn_GetOrganizationProvisioningStatus response message
 *
 * `result` is the value the msdyn_GetOrganizationProvisioningStatus action returns (see {@link msdyn_GetOrganizationProvisioningStatusResult}).
 */
export class msdyn_GetOrganizationProvisioningStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrganizationProvisioningStatusResult) {
    super("msdyn_GetOrganizationProvisioningStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetOrganizationProvisioningStatusResponse {
    return new msdyn_GetOrganizationProvisioningStatusResponse(
      data as msdyn_GetOrganizationProvisioningStatusResult
    );
  }
}
