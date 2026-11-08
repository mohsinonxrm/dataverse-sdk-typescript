import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrievePrincipalAccessInfo message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrievePrincipalAccessInfo_systemuserRequestParameters {
  ObjectId: string;
  EntityName: string;
}

/**
 * RetrievePrincipalAccessInfo request message
 *
 * Web API Function: RetrievePrincipalAccessInfo
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrievePrincipalAccessInfo_systemuserRequest
  extends OrganizationRequest
  implements Executable<RetrievePrincipalAccessInfo_systemuserResponse>
{
  declare readonly Parameters: Readonly<RetrievePrincipalAccessInfo_systemuserRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: RetrievePrincipalAccessInfo_systemuserRequestParameters
  ) {
    super("RetrievePrincipalAccessInfo", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${odataLiteral.guid(this.systemuserId)})/Microsoft.Dynamics.CRM.RetrievePrincipalAccessInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ObjectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ObjectId, "Edm.Guid"));
    }
    if (this.Parameters.EntityName !== undefined) {
      aliases.push(`EntityName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.EntityName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrievePrincipalAccessInfo_systemuserResponse> {
    // The body is the complex value, with its @odata.context
    return RetrievePrincipalAccessInfo_systemuserResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrievePrincipalAccessInfo function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrievePrincipalAccessInfo_systemuserResult {
  "@odata.context"?: string;
  AccessInfo: string;
}

/**
 * RetrievePrincipalAccessInfo response message
 *
 * `result` is the value the RetrievePrincipalAccessInfo function returns (see {@link RetrievePrincipalAccessInfo_systemuserResult}).
 */
export class RetrievePrincipalAccessInfo_systemuserResponse extends OrganizationResponse {
  constructor(public result: RetrievePrincipalAccessInfo_systemuserResult) {
    super("RetrievePrincipalAccessInfo");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrievePrincipalAccessInfo_systemuserResponse {
    return new RetrievePrincipalAccessInfo_systemuserResponse(
      data as RetrievePrincipalAccessInfo_systemuserResult
    );
  }
}
