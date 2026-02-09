import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_GetPresence function
 */
export interface CCaaS_GetPresenceResponse {
  AgentName: string;
  AgentId: string;
  DisabledChannels: string[];
  PresenceId: string;
  ActiveBrowserSessions: number;
  AllowedChannels: string[];
  CurrentPresenceStatusInfo: string;
  Timestamp: number;
}

/**
 * CCaaS_GetPresence function
 *
 * Unbound function
 */
export class CCaaS_GetPresenceFunction implements Executable<CCaaS_GetPresenceResponse> {
  constructor(public readonly apiVersion: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CCaaS_GetPresence`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.apiVersion !== undefined) {
      aliases.push(`ApiVersion=@p1`);
      params.append(
        "@p1",
        typeof this.apiVersion === "string" ? `'${this.apiVersion}'` : String(this.apiVersion)
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

  async parseResponse(response: Response): Promise<CCaaS_GetPresenceResponse> {
    const data = await response.json();
    return data as CCaaS_GetPresenceResponse;
  }
}
