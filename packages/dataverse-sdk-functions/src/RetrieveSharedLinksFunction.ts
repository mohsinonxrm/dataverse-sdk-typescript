import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { team } from "./types/index.js";

/**
 * Response from RetrieveSharedLinks function
 */
export interface RetrieveSharedLinksResponse {
  value: team[];
}

/**
 * RetrieveSharedLinks function
 *
 * Unbound function
 */
export class RetrieveSharedLinksFunction implements Executable<RetrieveSharedLinksResponse> {
  constructor(public readonly target: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveSharedLinks`;

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

  async parseResponse(response: Response): Promise<RetrieveSharedLinksResponse> {
    const data = await response.json();
    return data as RetrieveSharedLinksResponse;
  }
}
