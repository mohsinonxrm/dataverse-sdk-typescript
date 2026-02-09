import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { ChannelAccessProfileWithPrivileges } from "./types/index.js";

/**
 * Response from RetrieveChannelAccessProfilePrivileges function
 */
export interface RetrieveChannelAccessProfilePrivilegesResponse {
  ChannelAccessProfile: ChannelAccessProfileWithPrivileges;
}

/**
 * RetrieveChannelAccessProfilePrivileges function
 *
 * Unbound function
 */
export class RetrieveChannelAccessProfilePrivilegesFunction implements Executable<RetrieveChannelAccessProfilePrivilegesResponse> {
  constructor(public readonly channelAccessProfileId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveChannelAccessProfilePrivileges`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.channelAccessProfileId !== undefined) {
      aliases.push(`ChannelAccessProfileId=@p1`);
      params.append(
        "@p1",
        typeof this.channelAccessProfileId === "string"
          ? `'${this.channelAccessProfileId}'`
          : String(this.channelAccessProfileId)
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
    const data = await response.json();
    return data as RetrieveChannelAccessProfilePrivilegesResponse;
  }
}
