import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { MailboxTrackingFolderMapping } from "./types/index.js";

/**
 * Parameters of the RetrieveMailboxTrackingFolders message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMailboxTrackingFoldersRequestParameters {
  MailboxId: string;
}

/**
 * RetrieveMailboxTrackingFolders request message
 *
 * Web API Function: RetrieveMailboxTrackingFolders
 */
export class RetrieveMailboxTrackingFoldersRequest
  extends OrganizationRequest
  implements Executable<RetrieveMailboxTrackingFoldersResponse>
{
  declare readonly Parameters: Readonly<RetrieveMailboxTrackingFoldersRequestParameters>;

  constructor(parameters: RetrieveMailboxTrackingFoldersRequestParameters) {
    super("RetrieveMailboxTrackingFolders", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMailboxTrackingFolders`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.MailboxId !== undefined) {
      aliases.push(`MailboxId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.MailboxId, "Edm.String"));
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
    // The body is the complex value, with its @odata.context
    return RetrieveMailboxTrackingFoldersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveMailboxTrackingFolders function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveMailboxTrackingFoldersResult {
  "@odata.context"?: string;
  MailboxTrackingFolderMappings: MailboxTrackingFolderMapping[];
}

/**
 * RetrieveMailboxTrackingFolders response message
 *
 * `result` is the value the RetrieveMailboxTrackingFolders function returns (see {@link RetrieveMailboxTrackingFoldersResult}).
 */
export class RetrieveMailboxTrackingFoldersResponse extends OrganizationResponse {
  constructor(public result: RetrieveMailboxTrackingFoldersResult) {
    super("RetrieveMailboxTrackingFolders");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveMailboxTrackingFoldersResponse {
    return new RetrieveMailboxTrackingFoldersResponse(data as RetrieveMailboxTrackingFoldersResult);
  }
}
