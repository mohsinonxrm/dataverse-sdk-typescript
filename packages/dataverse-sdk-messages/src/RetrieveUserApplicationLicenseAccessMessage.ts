import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveUserApplicationLicenseAccess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveUserApplicationLicenseAccessRequestParameters {
  ApplicationId: string;
}

/**
 * RetrieveUserApplicationLicenseAccess request message
 *
 * Web API Function: RetrieveUserApplicationLicenseAccess
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrieveUserApplicationLicenseAccessRequest
  extends OrganizationRequest
  implements Executable<RetrieveUserApplicationLicenseAccessResponse>
{
  declare readonly Parameters: Readonly<RetrieveUserApplicationLicenseAccessRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: RetrieveUserApplicationLicenseAccessRequestParameters
  ) {
    super("RetrieveUserApplicationLicenseAccess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrieveUserApplicationLicenseAccess`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ApplicationId !== undefined) {
      aliases.push(`ApplicationId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ApplicationId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveUserApplicationLicenseAccessResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveUserApplicationLicenseAccessResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUserApplicationLicenseAccess function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveUserApplicationLicenseAccessResult {
  "@odata.context"?: string;
  LicenseAccessInfo: string;
}

/**
 * RetrieveUserApplicationLicenseAccess response message
 *
 * `result` is the value the RetrieveUserApplicationLicenseAccess function returns (see {@link RetrieveUserApplicationLicenseAccessResult}).
 */
export class RetrieveUserApplicationLicenseAccessResponse extends OrganizationResponse {
  constructor(public result: RetrieveUserApplicationLicenseAccessResult) {
    super("RetrieveUserApplicationLicenseAccess");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUserApplicationLicenseAccessResponse {
    return new RetrieveUserApplicationLicenseAccessResponse(
      data as RetrieveUserApplicationLicenseAccessResult
    );
  }
}
