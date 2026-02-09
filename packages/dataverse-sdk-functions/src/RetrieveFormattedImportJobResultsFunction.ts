import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveFormattedImportJobResults function
 */
export interface RetrieveFormattedImportJobResultsResponse {
  FormattedResults: string;
}

/**
 * RetrieveFormattedImportJobResults function
 *
 * Unbound function
 */
export class RetrieveFormattedImportJobResultsFunction implements Executable<RetrieveFormattedImportJobResultsResponse> {
  constructor(public readonly importJobId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveFormattedImportJobResults`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.importJobId !== undefined) {
      aliases.push(`ImportJobId=@p1`);
      params.append(
        "@p1",
        typeof this.importJobId === "string" ? `'${this.importJobId}'` : String(this.importJobId)
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

  async parseResponse(response: Response): Promise<RetrieveFormattedImportJobResultsResponse> {
    const data = await response.json();
    return data as RetrieveFormattedImportJobResultsResponse;
  }
}
