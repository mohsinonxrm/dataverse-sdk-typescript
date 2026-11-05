import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * SearchWeb request message
 *
 * Web API Action: SearchWeb
 */
export class SearchWebRequest extends OrganizationRequest implements Executable<SearchWebResponse> {
  constructor(
    public query: string,
    public urls: string[],
    public partnerSource: string,
    public summarize: boolean,
    public maxResults: number
  ) {
    super("SearchWeb");
  }

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
    return SearchWebResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      query: this.query,
      urls: this.urls,
      partnerSource: this.partnerSource,
      summarize: this.summarize,
      maxResults: this.maxResults,
    };
  }
}

/**
 * SearchWeb response message
 */
export class SearchWebResponse extends OrganizationResponse {
  constructor(public result: EntityReference) {
    super("SearchWeb");
  }

  static fromResponse(data: unknown): SearchWebResponse {
    return new SearchWebResponse((data as any).value);
  }
}
