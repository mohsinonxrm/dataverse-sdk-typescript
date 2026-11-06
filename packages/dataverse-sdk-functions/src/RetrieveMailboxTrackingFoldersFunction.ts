import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { MailboxTrackingFolderMapping } from "./types/index.js";

/**
 * Response from RetrieveMailboxTrackingFolders function
 */
export interface RetrieveMailboxTrackingFoldersResponse {
  MailboxTrackingFolderMappings: MailboxTrackingFolderMapping[];
}

/**
 * Parameters of the RetrieveMailboxTrackingFolders function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMailboxTrackingFoldersFunctionParameters {
  MailboxId: string;
}

/**
 * RetrieveMailboxTrackingFolders function
 *
 * Unbound function
 */
export class RetrieveMailboxTrackingFoldersFunction implements Executable<RetrieveMailboxTrackingFoldersResponse> {
  constructor(public readonly parameters: RetrieveMailboxTrackingFoldersFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMailboxTrackingFolders`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.MailboxId !== undefined) {
      aliases.push(`MailboxId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.MailboxId, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveMailboxTrackingFoldersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveMailboxTrackingFoldersResponse;
    return (await response.json()) as RetrieveMailboxTrackingFoldersResponse;
  }
}
