import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { sitemap } from "./types/index.js";

/**
 * RetrieveUnpublishedMultiple request message
 *
 * Web API Function: RetrieveUnpublishedMultiple
 */
export class RetrieveUnpublishedMultiple_sitemap_collectionRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublishedMultiple_sitemap_collectionResponse>
{
  constructor() {
    super("RetrieveUnpublishedMultiple");
  }

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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveUnpublishedMultiple_sitemap_collectionResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveUnpublishedMultiple_sitemap_collectionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the RetrieveUnpublishedMultiple function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveUnpublishedMultiple_sitemap_collectionResult = Array<
  sitemap & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveUnpublishedMultiple response message
 *
 * `result` is the value the RetrieveUnpublishedMultiple function returns (see {@link RetrieveUnpublishedMultiple_sitemap_collectionResult}).
 */
export class RetrieveUnpublishedMultiple_sitemap_collectionResponse extends OrganizationResponse {
  constructor(public result: RetrieveUnpublishedMultiple_sitemap_collectionResult) {
    super("RetrieveUnpublishedMultiple");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUnpublishedMultiple_sitemap_collectionResponse {
    return new RetrieveUnpublishedMultiple_sitemap_collectionResponse(
      data === undefined
        ? []
        : (data as { value: RetrieveUnpublishedMultiple_sitemap_collectionResult }).value
    );
  }
}
