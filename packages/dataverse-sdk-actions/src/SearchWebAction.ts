import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SearchWeb action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface SearchWebResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * SearchWeb action
 *
 * Unbound action
 */
export class SearchWebAction implements Executable<SearchWebResponse> {
  constructor(
    public readonly query: string,
    public readonly urls: string[],
    public readonly partnerSource: string,
    public readonly summarize: boolean,
    public readonly maxResults: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SearchWeb`;

    const body: Record<string, unknown> = {
      query: this.query,
      urls: this.urls,
      partnerSource: this.partnerSource,
      summarize: this.summarize,
      maxResults: this.maxResults,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SearchWebResponse> {
    const data = await response.json();
    return data as SearchWebResponse;
  }
}
