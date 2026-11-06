import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { kbarticle } from "./types/index.js";

/**
 * Response from RetrieveByTopIncidentProductKbArticle function
 */
export interface RetrieveByTopIncidentProductKbArticleResponse {
  value: kbarticle[];
}

/**
 * RetrieveByTopIncidentProductKbArticle function
 *
 * Bound function
 * Binding parameter: entity (mscrm.product)
 *
 * The first argument is the id of the product record to call it on.
 */
export class RetrieveByTopIncidentProductKbArticleFunction implements Executable<RetrieveByTopIncidentProductKbArticleResponse> {
  constructor(public readonly productId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/products(${this.productId})/Microsoft.Dynamics.CRM.RetrieveByTopIncidentProductKbArticle`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveByTopIncidentProductKbArticleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveByTopIncidentProductKbArticleResponse;
  }
}
