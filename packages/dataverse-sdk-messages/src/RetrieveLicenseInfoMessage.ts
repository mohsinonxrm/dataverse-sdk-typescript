import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveLicenseInfo message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveLicenseInfoRequestParameters {
  AccessMode: number;
}

/**
 * RetrieveLicenseInfo request message
 *
 * Web API Function: RetrieveLicenseInfo
 */
export class RetrieveLicenseInfoRequest
  extends OrganizationRequest
  implements Executable<RetrieveLicenseInfoResponse>
{
  declare readonly Parameters: Readonly<RetrieveLicenseInfoRequestParameters>;

  constructor(parameters: RetrieveLicenseInfoRequestParameters) {
    super("RetrieveLicenseInfo", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveLicenseInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.AccessMode !== undefined) {
      aliases.push(`AccessMode=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.AccessMode, "Edm.Int32"));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveLicenseInfoResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveLicenseInfoResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveLicenseInfo function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveLicenseInfoResult {
  "@odata.context"?: string;
  AvailableCount: number;
  GrantedLicenseCount: number;
}

/**
 * RetrieveLicenseInfo response message
 *
 * `result` is the value the RetrieveLicenseInfo function returns (see {@link RetrieveLicenseInfoResult}).
 */
export class RetrieveLicenseInfoResponse extends OrganizationResponse {
  constructor(public result: RetrieveLicenseInfoResult) {
    super("RetrieveLicenseInfo");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveLicenseInfoResponse {
    return new RetrieveLicenseInfoResponse(data as RetrieveLicenseInfoResult);
  }
}
