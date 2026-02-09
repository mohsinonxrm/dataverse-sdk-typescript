import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { kbarticle, subject } from "./types/index.js";

/**
 * Response from SearchByKeywordsKbArticle function
 */
export interface SearchByKeywordsKbArticleResponse {
  value: kbarticle[];
}

/**
 * SearchByKeywordsKbArticle function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.kbarticle))
 */
export class SearchByKeywordsKbArticleFunction implements Executable<SearchByKeywordsKbArticleResponse> {
  constructor(
    public readonly searchText: string,
    public readonly subject: subject,
    public readonly useInflection: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/SearchByKeywordsKbArticle`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.searchText !== undefined) {
      aliases.push(`SearchText=@p1`);
      params.append(
        "@p1",
        typeof this.searchText === "string" ? `'${this.searchText}'` : String(this.searchText)
      );
    }
    if (this.subject !== undefined) {
      aliases.push(`Subject=@p2`);
      params.append("@p2", JSON.stringify(this.subject));
    }
    if (this.useInflection !== undefined) {
      aliases.push(`UseInflection=@p3`);
      params.append(
        "@p3",
        typeof this.useInflection === "string"
          ? `'${this.useInflection}'`
          : String(this.useInflection)
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

  async parseResponse(response: Response): Promise<SearchByKeywordsKbArticleResponse> {
    const data = await response.json();
    return data as SearchByKeywordsKbArticleResponse;
  }
}
