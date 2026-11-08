import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { sitemap } from "./types/index.js";

/**
 * RetrieveUnpublished request message
 *
 * Web API Function: RetrieveUnpublished
 *
 * The first argument is the id of the sitemap record to call it on.
 */
export class RetrieveUnpublished_sitemapRequest
  extends OrganizationRequest
  implements Executable<RetrieveUnpublished_sitemapResponse>
{
  constructor(public sitemapId: string) {
    super("RetrieveUnpublished");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/sitemaps(${odataLiteral.guid(this.sitemapId)})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_sitemapResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return RetrieveUnpublished_sitemapResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return RetrieveUnpublished_sitemapResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveUnpublished function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type RetrieveUnpublished_sitemapResult =
  (sitemap & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string }) | null;

/**
 * RetrieveUnpublished response message
 *
 * `result` is the value the RetrieveUnpublished function returns (see {@link RetrieveUnpublished_sitemapResult}).
 */
export class RetrieveUnpublished_sitemapResponse extends OrganizationResponse {
  constructor(public result: RetrieveUnpublished_sitemapResult) {
    super("RetrieveUnpublished");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveUnpublished_sitemapResponse {
    return new RetrieveUnpublished_sitemapResponse(
      (data ?? null) as RetrieveUnpublished_sitemapResult
    );
  }
}
