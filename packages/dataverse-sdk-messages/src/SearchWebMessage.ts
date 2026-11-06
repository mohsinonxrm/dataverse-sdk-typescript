import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SearchWeb message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SearchWebRequestParameters {
  query: string;
  urls: string[];
  partnerSource: string;
  summarize: boolean;
  maxResults: number;
}

/**
 * SearchWeb request message
 *
 * Web API Action: SearchWeb
 */
export class SearchWebRequest extends OrganizationRequest implements Executable<SearchWebResponse> {
  declare readonly Parameters: Readonly<SearchWebRequestParameters>;

  constructor(parameters: SearchWebRequestParameters) {
    super("SearchWeb", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SearchWeb`;

    const body = requestBody({
      query: this.Parameters.query,
      urls: this.Parameters.urls,
      partnerSource: this.Parameters.partnerSource,
      summarize: this.Parameters.summarize,
      maxResults: this.Parameters.maxResults,
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
    if (response.status === 204) return SearchWebResponse.fromResponse({});
    return SearchWebResponse.fromResponse(await response.json());
  }
}

/**
 * SearchWeb response message
 */
export class SearchWebResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("SearchWeb");
  }

  static fromResponse(data: unknown): SearchWebResponse {
    return new SearchWebResponse(responseObject<Record<string, unknown>>(data));
  }
}
