import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { sitemap } from "./types/index.js";

/**
 * Response from RetrieveUnpublishedMultiple function
 */
export interface RetrieveUnpublishedMultiple_sitemap_collectionResponse {
  value: sitemap[];
}

/**
 * RetrieveUnpublishedMultiple function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.sitemap))
 */
export class RetrieveUnpublishedMultiple_sitemap_collectionFunction implements Executable<RetrieveUnpublishedMultiple_sitemap_collectionResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/sitemaps/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveUnpublishedMultiple_sitemap_collectionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveUnpublishedMultiple_sitemap_collectionResponse;
  }
}
