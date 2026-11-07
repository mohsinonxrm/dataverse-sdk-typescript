import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { kbarticle, subject } from "./types/index.js";

/**
 * Response from the SearchByKeywordsKbArticle function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type SearchByKeywordsKbArticleResponse = Array<
  kbarticle & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * Parameters of the SearchByKeywordsKbArticle function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SearchByKeywordsKbArticleFunctionParameters {
  SearchText: string;
  Subject: subject;
  UseInflection: boolean;
}

/**
 * SearchByKeywordsKbArticle function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.kbarticle))
 */
export class SearchByKeywordsKbArticleFunction implements Executable<SearchByKeywordsKbArticleResponse> {
  constructor(public readonly parameters: SearchByKeywordsKbArticleFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/kbarticles/Microsoft.Dynamics.CRM.SearchByKeywordsKbArticle`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.SearchText !== undefined) {
      aliases.push(`SearchText=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.SearchText, "Edm.String"));
    }
    if (this.parameters.Subject !== undefined) {
      aliases.push(`Subject=@p2`);
      params.append("@p2", JSON.stringify(this.parameters.Subject));
    }
    if (this.parameters.UseInflection !== undefined) {
      aliases.push(`UseInflection=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.UseInflection, "Edm.Boolean"));
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
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: SearchByKeywordsKbArticleResponse }).value;
  }
}
