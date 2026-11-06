import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { kbarticle, subject } from "./types/index.js";

/**
 * Response from SearchByBodyKbArticle function
 */
export interface SearchByBodyKbArticleResponse {
  value: kbarticle[];
}

/**
 * Parameters of the SearchByBodyKbArticle function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SearchByBodyKbArticleFunctionParameters {
  SearchText: string;
  Subject: subject;
  UseInflection: boolean;
}

/**
 * SearchByBodyKbArticle function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.kbarticle))
 */
export class SearchByBodyKbArticleFunction implements Executable<SearchByBodyKbArticleResponse> {
  constructor(public readonly parameters: SearchByBodyKbArticleFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/kbarticles/Microsoft.Dynamics.CRM.SearchByBodyKbArticle`;

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

  async parseResponse(response: Response): Promise<SearchByBodyKbArticleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as SearchByBodyKbArticleResponse;
  }
}
