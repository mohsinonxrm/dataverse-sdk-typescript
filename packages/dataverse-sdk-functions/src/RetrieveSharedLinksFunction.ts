import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { team } from "./types/index.js";

/**
 * Response from RetrieveSharedLinks function
 */
export interface RetrieveSharedLinksResponse {
  value: team[];
}

/**
 * Parameters of the RetrieveSharedLinks function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveSharedLinksFunctionParameters {
  Target: EntityReference;
}

/**
 * RetrieveSharedLinks function
 *
 * Unbound function
 */
export class RetrieveSharedLinksFunction implements Executable<RetrieveSharedLinksResponse> {
  constructor(public readonly parameters: RetrieveSharedLinksFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveSharedLinks`;

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

  async parseResponse(response: Response): Promise<RetrieveSharedLinksResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveSharedLinksResponse;
    return (await response.json()) as RetrieveSharedLinksResponse;
  }
}
