import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from RetrievePrincipalAccessInfo function
 */
export interface RetrievePrincipalAccessInfo_teamResponse {
  AccessInfo: string;
}

/**
 * RetrievePrincipalAccessInfo function
 *
 * Bound function
 * Binding parameter: entity (mscrm.team)
 */
export class RetrievePrincipalAccessInfo_teamFunction implements Executable<RetrievePrincipalAccessInfo_teamResponse> {
  constructor(
    public readonly teamId: string,
    public readonly objectId: string,
    public readonly entityName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccessInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.objectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.objectId, "Edm.Guid"));
    }
    if (this.entityName !== undefined) {
      aliases.push(`EntityName=@p2`);
      params.append("@p2", formatParameterAlias(this.entityName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrievePrincipalAccessInfo_teamResponse> {
    const data = await response.json();
    return data as RetrievePrincipalAccessInfo_teamResponse;
  }
}
