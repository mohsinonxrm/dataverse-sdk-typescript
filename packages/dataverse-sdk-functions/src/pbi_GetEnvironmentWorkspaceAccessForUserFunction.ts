import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from pbi_GetEnvironmentWorkspaceAccessForUser function
 */
export interface pbi_GetEnvironmentWorkspaceAccessForUserResponse {
  pbi_Access: string;
}

/**
 * pbi_GetEnvironmentWorkspaceAccessForUser function
 *
 * Unbound function
 */
export class pbi_GetEnvironmentWorkspaceAccessForUserFunction implements Executable<pbi_GetEnvironmentWorkspaceAccessForUserResponse> {
  constructor(public readonly pbi_UserObjectId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/pbi_GetEnvironmentWorkspaceAccessForUser`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.pbi_UserObjectId !== undefined) {
      aliases.push(`pbi_UserObjectId=@p1`);
      params.append(
        "@p1",
        typeof this.pbi_UserObjectId === "string"
          ? `'${this.pbi_UserObjectId}'`
          : String(this.pbi_UserObjectId)
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

  async parseResponse(
    response: Response
  ): Promise<pbi_GetEnvironmentWorkspaceAccessForUserResponse> {
    const data = await response.json();
    return data as pbi_GetEnvironmentWorkspaceAccessForUserResponse;
  }
}
