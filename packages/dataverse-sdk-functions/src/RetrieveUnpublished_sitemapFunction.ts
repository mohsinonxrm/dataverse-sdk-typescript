import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { sitemap } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_sitemapResponse extends sitemap {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.sitemap)
 *
 * The first argument is the id of the sitemap record to call it on.
 */
export class RetrieveUnpublished_sitemapFunction implements Executable<RetrieveUnpublished_sitemapResponse> {
  constructor(public readonly sitemapId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/sitemaps(${this.sitemapId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_sitemapResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveUnpublished_sitemapResponse;
    return (await response.json()) as RetrieveUnpublished_sitemapResponse;
  }
}
