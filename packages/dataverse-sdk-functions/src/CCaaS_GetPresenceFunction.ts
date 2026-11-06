import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from CCaaS_GetPresence function
 */
export interface CCaaS_GetPresenceResponse {
  ActiveBrowserSessions: number;
  AgentId: string;
  AgentName: string;
  AllowedChannels: string[];
  CurrentPresenceStatusInfo: string;
  DisabledChannels: string[];
  PresenceId: string;
  Timestamp: number;
}

/**
 * Parameters of the CCaaS_GetPresence function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetPresenceFunctionParameters {
  ApiVersion: string;
}

/**
 * CCaaS_GetPresence function
 *
 * Unbound function
 */
export class CCaaS_GetPresenceFunction implements Executable<CCaaS_GetPresenceResponse> {
  constructor(public readonly parameters: CCaaS_GetPresenceFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CCaaS_GetPresence`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ApiVersion !== undefined) {
      aliases.push(`ApiVersion=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ApiVersion, "Edm.String"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_GetPresenceResponse;
    return (await response.json()) as CCaaS_GetPresenceResponse;
  }
}
