import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSILicenseStatus request message
 *
 * Web API Action: msdyn_GetSILicenseStatus
 */
export class msdyn_GetSILicenseStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSILicenseStatusResponse>
{
  constructor() {
    super("msdyn_GetSILicenseStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSILicenseStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSILicenseStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSILicenseStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSILicenseStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSILicenseStatusResult {
  "@odata.context"?: string;
  SILicenseStatus: string;
}

/**
 * msdyn_GetSILicenseStatus response message
 *
 * `result` is the value the msdyn_GetSILicenseStatus action returns (see {@link msdyn_GetSILicenseStatusResult}).
 */
export class msdyn_GetSILicenseStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSILicenseStatusResult) {
    super("msdyn_GetSILicenseStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSILicenseStatusResponse {
    return new msdyn_GetSILicenseStatusResponse(data as msdyn_GetSILicenseStatusResult);
  }
}
