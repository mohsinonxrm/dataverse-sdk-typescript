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
    // The body is the complex value, with its @odata.context
    return msdyn_GetRIProvisioningStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetRIProvisioningStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRIProvisioningStatusResult {
  "@odata.context"?: string;
  DCIHubPlanType: string;
  EEProvisioningStatus: number;
  RIErrorStatusCode: string;
  RIErrorStatusMessage: string;
  RIProvisioningStatus: number;
}

/**
 * msdyn_GetRIProvisioningStatus response message
 *
 * `result` is the value the msdyn_GetRIProvisioningStatus action returns (see {@link msdyn_GetRIProvisioningStatusResult}).
 */
export class msdyn_GetRIProvisioningStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRIProvisioningStatusResult) {
    super("msdyn_GetRIProvisioningStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetRIProvisioningStatusResponse {
    return new msdyn_GetRIProvisioningStatusResponse(data as msdyn_GetRIProvisioningStatusResult);
  }
}
