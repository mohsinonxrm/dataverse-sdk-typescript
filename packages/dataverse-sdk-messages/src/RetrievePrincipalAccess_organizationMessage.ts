import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { AccessRights } from "./types/index.js";

/**
 * Parameters of the RetrievePrincipalAccess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrievePrincipalAccess_organizationRequestParameters {
  Target: EntityReference;
}

/**
 * RetrievePrincipalAccess request message
 *
 * Web API Function: RetrievePrincipalAccess
 *
 * The first argument is the id of the organization record to call it on.
 */
export class RetrievePrincipalAccess_organizationRequest
  extends OrganizationRequest
  implements Executable<RetrievePrincipalAccess_organizationResponse>
{
  declare readonly Parameters: Readonly<RetrievePrincipalAccess_organizationRequestParameters>;

  constructor(
    public organizationId: string,
    parameters: RetrievePrincipalAccess_organizationRequestParameters
  ) {
    super("RetrievePrincipalAccess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/organizations(${odataLiteral.guid(this.organizationId)})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Target, "mscrm.crmbaseentity", "EntityType")
      );
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

  async parseResponse(response: Response): Promise<RetrievePrincipalAccess_organizationResponse> {
    // The body is the complex value, with its @odata.context
    return RetrievePrincipalAccess_organizationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrievePrincipalAccess function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrievePrincipalAccess_organizationResult {
  "@odata.context"?: string;
  AccessRights: AccessRights;
}

/**
 * RetrievePrincipalAccess response message
 *
 * `result` is the value the RetrievePrincipalAccess function returns (see {@link RetrievePrincipalAccess_organizationResult}).
 */
export class RetrievePrincipalAccess_organizationResponse extends OrganizationResponse {
  constructor(public result: RetrievePrincipalAccess_organizationResult) {
    super("RetrievePrincipalAccess");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrievePrincipalAccess_organizationResponse {
    return new RetrievePrincipalAccess_organizationResponse(
      data as RetrievePrincipalAccess_organizationResult
    );
  }
}
