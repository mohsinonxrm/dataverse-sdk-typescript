import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from pbi_GetEnvironmentWorkspaceAccessForUser function
 */
export interface pbi_GetEnvironmentWorkspaceAccessForUserResponse {
  pbi_Access: string;
}

/**
 * Parameters of the pbi_GetEnvironmentWorkspaceAccessForUser function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface pbi_GetEnvironmentWorkspaceAccessForUserFunctionParameters {
  pbi_UserObjectId: string;
}

/**
 * pbi_GetEnvironmentWorkspaceAccessForUser function
 *
 * Unbound function
 */
export class pbi_GetEnvironmentWorkspaceAccessForUserFunction implements Executable<pbi_GetEnvironmentWorkspaceAccessForUserResponse> {
  constructor(
    public readonly parameters: pbi_GetEnvironmentWorkspaceAccessForUserFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/pbi_GetEnvironmentWorkspaceAccessForUser`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.pbi_UserObjectId !== undefined) {
      aliases.push(`pbi_UserObjectId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.pbi_UserObjectId, "Edm.String"));
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

  async parseResponse(
    response: Response
  ): Promise<pbi_GetEnvironmentWorkspaceAccessForUserResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as pbi_GetEnvironmentWorkspaceAccessForUserResponse;
    return (await response.json()) as pbi_GetEnvironmentWorkspaceAccessForUserResponse;
  }
}
