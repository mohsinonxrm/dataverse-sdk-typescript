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
 * Parameters of the RetrievePrincipalAccess function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrievePrincipalAccess_systemuserFunctionParameters {
  Target: EntityReference;
}

/**
 * RetrievePrincipalAccess function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RetrievePrincipalAccess_systemuserFunction implements Executable<RetrievePrincipalAccess_systemuserResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: RetrievePrincipalAccess_systemuserFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess`;

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

  async parseResponse(response: Response): Promise<RetrievePrincipalAccess_systemuserResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrievePrincipalAccess_systemuserResponse;
  }
}
