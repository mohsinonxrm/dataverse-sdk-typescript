import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { AppointmentRequest, SearchResults } from "./types/index.js";

/**
 * Parameters of the Search message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SearchRequestParameters {
  AppointmentRequest?: AppointmentRequest;
}

/**
 * Search request message
 *
 * Web API Function: Search
 */
export class SearchRequest extends OrganizationRequest implements Executable<SearchResponse> {
  declare readonly Parameters: Readonly<SearchRequestParameters>;

  constructor(parameters: SearchRequestParameters = {}) {
    super("Search", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/Search`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.AppointmentRequest !== undefined) {
      aliases.push(`AppointmentRequest=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(
          enumBody(this.Parameters.AppointmentRequest, "AppointmentRequest"),
          "mscrm.AppointmentRequest",
          "ComplexType"
        )
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

  async parseResponse(response: Response): Promise<SearchResponse> {
    // The body is the complex value, with its @odata.context
    return SearchResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Search function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SearchResult {
  "@odata.context"?: string;
  SearchResults: SearchResults;
}

/**
 * Search response message
 *
 * `result` is the value the Search function returns (see {@link SearchResult}).
 */
export class SearchResponse extends OrganizationResponse {
  constructor(public result: SearchResult) {
    super("Search");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SearchResponse {
    return new SearchResponse(data as SearchResult);
  }
}
