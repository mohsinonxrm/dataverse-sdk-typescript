import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { ChannelAccessProfileWithPrivileges } from "./types/index.js";

/**
 * Response from RetrieveChannelAccessProfilePrivileges function
 */
export interface RetrieveChannelAccessProfilePrivilegesResponse {
  ChannelAccessProfile: ChannelAccessProfileWithPrivileges;
}

/**
 * Parameters of the RetrieveChannelAccessProfilePrivileges function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveChannelAccessProfilePrivilegesFunctionParameters {
  ChannelAccessProfileId: string;
}

/**
 * RetrieveChannelAccessProfilePrivileges function
 *
 * Unbound function
 */
export class RetrieveChannelAccessProfilePrivilegesFunction implements Executable<RetrieveChannelAccessProfilePrivilegesResponse> {
  constructor(
    public readonly parameters: RetrieveChannelAccessProfilePrivilegesFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveChannelAccessProfilePrivileges`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ChannelAccessProfileId !== undefined) {
      aliases.push(`ChannelAccessProfileId=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.ChannelAccessProfileId, "Edm.Guid")
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

  async parseResponse(response: Response): Promise<RetrieveChannelAccessProfilePrivilegesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveChannelAccessProfilePrivilegesResponse;
  }
}
