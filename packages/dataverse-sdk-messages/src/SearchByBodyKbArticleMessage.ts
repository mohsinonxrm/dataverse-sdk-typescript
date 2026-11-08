import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { kbarticle, subject } from "./types/index.js";

/**
 * Parameters of the SearchByBodyKbArticle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SearchByBodyKbArticleRequestParameters {
  SearchText: string;
  Subject: subject;
  UseInflection: boolean;
}

/**
 * SearchByBodyKbArticle request message
 *
 * Web API Function: SearchByBodyKbArticle
 */
export class SearchByBodyKbArticleRequest
  extends OrganizationRequest
  implements Executable<SearchByBodyKbArticleResponse>
{
  declare readonly Parameters: Readonly<SearchByBodyKbArticleRequestParameters>;

  constructor(parameters: SearchByBodyKbArticleRequestParameters) {
    super("SearchByBodyKbArticle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/kbarticles/Microsoft.Dynamics.CRM.SearchByBodyKbArticle`;

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

  async parseResponse(response: Response): Promise<SearchByBodyKbArticleResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return SearchByBodyKbArticleResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return SearchByBodyKbArticleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SearchByBodyKbArticle function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type SearchByBodyKbArticleResult = Array<
  kbarticle & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * SearchByBodyKbArticle response message
 *
 * `result` is the value the SearchByBodyKbArticle function returns (see {@link SearchByBodyKbArticleResult}).
 */
export class SearchByBodyKbArticleResponse extends OrganizationResponse {
  constructor(public result: SearchByBodyKbArticleResult) {
    super("SearchByBodyKbArticle");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SearchByBodyKbArticleResponse {
    return new SearchByBodyKbArticleResponse(
      data === undefined ? [] : (data as { value: SearchByBodyKbArticleResult }).value
    );
  }
}
