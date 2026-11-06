import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the SearchWeb action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SearchWebActionParameters {
  query: string;
  urls: string[];
  partnerSource: string;
  summarize: boolean;
  maxResults: number;
}

/**
 * SearchWeb action
 *
 * Unbound action
 */
export class SearchWebAction implements Executable<SearchWebResponse> {
  constructor(public readonly parameters: SearchWebActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SearchWeb`;

    const body = requestBody({
      query: this.parameters.query,
      urls: this.parameters.urls,
      partnerSource: this.parameters.partnerSource,
      summarize: this.parameters.summarize,
      maxResults: this.parameters.maxResults,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SearchWebResponse;
    return (await response.json()) as SearchWebResponse;
  }
}
