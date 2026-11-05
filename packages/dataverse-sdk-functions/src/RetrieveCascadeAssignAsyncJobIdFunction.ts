import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";

/**
 * Response from RetrieveCascadeAssignAsyncJobId function
 */
export interface RetrieveCascadeAssignAsyncJobIdResponse {
  AsyncJobName: string;
  AsyncJobId: string;
}

/**
 * RetrieveCascadeAssignAsyncJobId function
 *
 * Unbound function
 */
export class RetrieveCascadeAssignAsyncJobIdFunction implements Executable<RetrieveCascadeAssignAsyncJobIdResponse> {
  constructor(public readonly parentEntityId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCascadeAssignAsyncJobId`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parentEntityId !== undefined) {
      aliases.push(`ParentEntityId=@p1`);
      params.append("@p1", formatAliasValue(this.parentEntityId));
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

  async parseResponse(response: Response): Promise<RetrieveCascadeAssignAsyncJobIdResponse> {
    const data = await response.json();
    return data as RetrieveCascadeAssignAsyncJobIdResponse;
  }
}
