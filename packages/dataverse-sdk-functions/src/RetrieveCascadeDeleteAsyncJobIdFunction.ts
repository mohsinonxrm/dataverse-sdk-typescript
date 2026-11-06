import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveCascadeDeleteAsyncJobId function
 */
export interface RetrieveCascadeDeleteAsyncJobIdResponse {
  AsyncJobName: string;
  AsyncJobId: string;
}

/**
 * Parameters of the RetrieveCascadeDeleteAsyncJobId function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveCascadeDeleteAsyncJobIdFunctionParameters {
  ParentEntityIds: string[];
}

/**
 * RetrieveCascadeDeleteAsyncJobId function
 *
 * Unbound function
 */
export class RetrieveCascadeDeleteAsyncJobIdFunction implements Executable<RetrieveCascadeDeleteAsyncJobIdResponse> {
  constructor(public readonly parameters: RetrieveCascadeDeleteAsyncJobIdFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveCascadeDeleteAsyncJobId`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ParentEntityIds !== undefined) {
      aliases.push(`ParentEntityIds=@p1`);
      params.append("@p1", JSON.stringify(this.parameters.ParentEntityIds));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveCascadeDeleteAsyncJobIdResponse;
    return (await response.json()) as RetrieveCascadeDeleteAsyncJobIdResponse;
  }
}
