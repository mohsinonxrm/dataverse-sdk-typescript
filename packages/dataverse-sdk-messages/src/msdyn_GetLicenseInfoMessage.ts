import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetLicenseInfo request message
 *
 * Web API Action: msdyn_GetLicenseInfo
 */
export class msdyn_GetLicenseInfoRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLicenseInfoResponse>
{
  constructor() {
    super("msdyn_GetLicenseInfo");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLicenseInfo`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetLicenseInfoResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetLicenseInfoResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetLicenseInfo action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetLicenseInfoResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_GetLicenseInfo response message
 *
 * `result` is the value the msdyn_GetLicenseInfo action returns (see {@link msdyn_GetLicenseInfoResult}).
 */
export class msdyn_GetLicenseInfoResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLicenseInfoResult) {
    super("msdyn_GetLicenseInfo");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetLicenseInfoResponse {
    return new msdyn_GetLicenseInfoResponse(data as msdyn_GetLicenseInfoResult);
  }
}
