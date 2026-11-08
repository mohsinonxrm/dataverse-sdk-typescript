import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { kbarticle, subject } from "./types/index.js";

/**
 * Parameters of the SearchByKeywordsKbArticle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SearchByKeywordsKbArticleRequestParameters {
  SearchText: string;
  Subject: subject;
  UseInflection: boolean;
}

/**
 * SearchByKeywordsKbArticle request message
 *
 * Web API Function: SearchByKeywordsKbArticle
 */
export class SearchByKeywordsKbArticleRequest
  extends OrganizationRequest
  implements Executable<SearchByKeywordsKbArticleResponse>
{
  declare readonly Parameters: Readonly<SearchByKeywordsKbArticleRequestParameters>;

  constructor(parameters: SearchByKeywordsKbArticleRequestParameters) {
    super("SearchByKeywordsKbArticle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/kbarticles/Microsoft.Dynamics.CRM.SearchByKeywordsKbArticle`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.SearchText !== undefined) {
      aliases.push(`SearchText=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.SearchText, "Edm.String"));
    }
    if (this.Parameters.Subject !== undefined) {
      aliases.push(`Subject=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.Subject, "mscrm.subject", "EntityType")
      );
    }
    if (this.Parameters.UseInflection !== undefined) {
      aliases.push(`UseInflection=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.UseInflection, "Edm.Boolean"));
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

  async parseResponse(response: Response): Promise<SearchByKeywordsKbArticleResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return SearchByKeywordsKbArticleResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return SearchByKeywordsKbArticleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SearchByKeywordsKbArticle function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type SearchByKeywordsKbArticleResult = Array<
  kbarticle & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * SearchByKeywordsKbArticle response message
 *
 * `result` is the value the SearchByKeywordsKbArticle function returns (see {@link SearchByKeywordsKbArticleResult}).
 */
export class SearchByKeywordsKbArticleResponse extends OrganizationResponse {
  constructor(public result: SearchByKeywordsKbArticleResult) {
    super("SearchByKeywordsKbArticle");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SearchByKeywordsKbArticleResponse {
    return new SearchByKeywordsKbArticleResponse(
      data === undefined ? [] : (data as { value: SearchByKeywordsKbArticleResult }).value
    );
  }
}
