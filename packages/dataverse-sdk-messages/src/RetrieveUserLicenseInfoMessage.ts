import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { UserLicenseInfo } from "./types/index.js";

/**
 * RetrieveUserLicenseInfo request message
 *
 * Web API Function: RetrieveUserLicenseInfo
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserLicenseInfoRequest
  extends OrganizationRequest
  implements Executable<RetrieveUserLicenseInfoResponse>
{
  constructor(public systemuserId: string) {
    super("RetrieveUserLicenseInfo");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveUserLicenseInfo`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUserLicenseInfoResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveUserLicenseInfoResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUserLicenseInfo function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUserLicenseInfoResult {
  "@odata.context"?: string;
  licenseInfo: UserLicenseInfo;
}

/**
 * RetrieveUserLicenseInfo response message
 *
 * `result` is the value the RetrieveUserLicenseInfo function returns (see {@link RetrieveUserLicenseInfoResult}).
 */
export class RetrieveUserLicenseInfoResponse extends OrganizationResponse {
  constructor(public result: RetrieveUserLicenseInfoResult) {
    super("RetrieveUserLicenseInfo");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUserLicenseInfoResponse {
    return new RetrieveUserLicenseInfoResponse(data as RetrieveUserLicenseInfoResult);
  }
}
