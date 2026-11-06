import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { AccessRights } from "./types/index.js";

/**
 * Response from RetrievePrincipalAccess function
 */
export interface RetrievePrincipalAccess_organizationResponse {
  AccessRights: AccessRights;
}

/**
 * Parameters of the RetrievePrincipalAccess function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrievePrincipalAccess_organizationFunctionParameters {
  Target: EntityReference;
}

/**
 * RetrievePrincipalAccess function
 *
 * Bound function
 * Binding parameter: entity (mscrm.organization)
 *
 * The first argument is the id of the organization record to call it on.
 */
export class RetrievePrincipalAccess_organizationFunction implements Executable<RetrievePrincipalAccess_organizationResponse> {
  constructor(
    public readonly organizationId: string,
    public readonly parameters: RetrievePrincipalAccess_organizationFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/organizations(${this.organizationId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.Target, "mscrm.crmbaseentity", "EntityType")
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrievePrincipalAccess_organizationResponse;
    return (await response.json()) as RetrievePrincipalAccess_organizationResponse;
  }
}
