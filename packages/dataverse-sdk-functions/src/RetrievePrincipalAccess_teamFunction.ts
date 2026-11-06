import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { AccessRights } from "./types/index.js";

/**
 * Response from RetrievePrincipalAccess function
 */
export interface RetrievePrincipalAccess_teamResponse {
  AccessRights: AccessRights;
}

/**
 * RetrievePrincipalAccess function
 *
 * Bound function
 * Binding parameter: entity (mscrm.team)
 */
export class RetrievePrincipalAccess_teamFunction implements Executable<RetrievePrincipalAccess_teamResponse> {
  constructor(
    public readonly teamId: string,
    public readonly target: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append("@p1", formatParameterAlias(this.target, "mscrm.crmbaseentity", "EntityType"));
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

  async parseResponse(response: Response): Promise<RetrievePrincipalAccess_teamResponse> {
    const data = await response.json();
    return data as RetrievePrincipalAccess_teamResponse;
  }
}
