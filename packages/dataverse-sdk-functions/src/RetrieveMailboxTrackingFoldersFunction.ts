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
 * RetrieveMailboxTrackingFolders function
 *
 * Unbound function
 */
export class RetrieveMailboxTrackingFoldersFunction implements Executable<RetrieveMailboxTrackingFoldersResponse> {
  constructor(public readonly mailboxId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMailboxTrackingFolders`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.mailboxId !== undefined) {
      aliases.push(`MailboxId=@p1`);
      params.append("@p1", formatParameterAlias(this.mailboxId, "Edm.String"));
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
    const data = await response.json();
    return data as RetrieveMailboxTrackingFoldersResponse;
  }
}
