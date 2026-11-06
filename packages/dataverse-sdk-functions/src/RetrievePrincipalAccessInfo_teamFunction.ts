import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from RetrievePrincipalAccessInfo function
 */
export interface RetrievePrincipalAccessInfo_teamResponse {
  AccessInfo: string;
}

/**
 * Parameters of the RetrievePrincipalAccessInfo function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrievePrincipalAccessInfo_teamFunctionParameters {
  ObjectId: string;
  EntityName: string;
}

/**
 * RetrievePrincipalAccessInfo function
 *
 * Bound function
 * Binding parameter: entity (mscrm.team)
 *
 * The first argument is the id of the team record to call it on.
 */
export class RetrievePrincipalAccessInfo_teamFunction implements Executable<RetrievePrincipalAccessInfo_teamResponse> {
  constructor(
    public readonly teamId: string,
    public readonly parameters: RetrievePrincipalAccessInfo_teamFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccessInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ObjectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ObjectId, "Edm.Guid"));
    }
    if (this.parameters.EntityName !== undefined) {
      aliases.push(`EntityName=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.EntityName, "Edm.String"));
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrievePrincipalAccessInfo_teamResponse;
  }
}
