import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { AccessRights } from "./types/index.js";

/**
 * Response from RetrievePrincipalAccess function
 */
export interface RetrievePrincipalAccess_systemuserResponse {
  AccessRights: AccessRights;
}

/**
 * RetrievePrincipalAccess function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 */
export class RetrievePrincipalAccess_systemuserFunction implements Executable<RetrievePrincipalAccess_systemuserResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly target: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess`;

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

  async parseResponse(response: Response): Promise<RetrievePrincipalAccess_systemuserResponse> {
    const data = await response.json();
    return data as RetrievePrincipalAccess_systemuserResponse;
  }
}
