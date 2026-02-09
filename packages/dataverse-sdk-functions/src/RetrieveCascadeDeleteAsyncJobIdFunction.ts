import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveCascadeDeleteAsyncJobId function
 */
export interface RetrieveCascadeDeleteAsyncJobIdResponse {
  AsyncJobName: string;
  AsyncJobId: string;
}

/**
 * RetrieveCascadeDeleteAsyncJobId function
 *
 * Unbound function
 */
export class RetrieveCascadeDeleteAsyncJobIdFunction implements Executable<RetrieveCascadeDeleteAsyncJobIdResponse> {
  constructor(public readonly parentEntityIds: string[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCascadeDeleteAsyncJobId`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parentEntityIds !== undefined) {
      aliases.push(`ParentEntityIds=@p1`);
      params.append("@p1", JSON.stringify(this.parentEntityIds));
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

  async parseResponse(response: Response): Promise<RetrieveCascadeDeleteAsyncJobIdResponse> {
    const data = await response.json();
    return data as RetrieveCascadeDeleteAsyncJobIdResponse;
  }
}
