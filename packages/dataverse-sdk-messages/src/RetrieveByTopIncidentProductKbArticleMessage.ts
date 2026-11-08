import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { kbarticle } from "./types/index.js";

/**
 * RetrieveByTopIncidentProductKbArticle request message
 *
 * Web API Function: RetrieveByTopIncidentProductKbArticle
 *
 * The first argument is the id of the product record to call it on.
 */
export class RetrieveByTopIncidentProductKbArticleRequest
  extends OrganizationRequest
  implements Executable<RetrieveByTopIncidentProductKbArticleResponse>
{
  constructor(public productId: string) {
    super("RetrieveByTopIncidentProductKbArticle");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/products(${odataLiteral.guid(this.productId)})/Microsoft.Dynamics.CRM.RetrieveByTopIncidentProductKbArticle`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveByTopIncidentProductKbArticleResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveByTopIncidentProductKbArticleResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveByTopIncidentProductKbArticleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveByTopIncidentProductKbArticle function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveByTopIncidentProductKbArticleResult = Array<
  kbarticle & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveByTopIncidentProductKbArticle response message
 *
 * `result` is the value the RetrieveByTopIncidentProductKbArticle function returns (see {@link RetrieveByTopIncidentProductKbArticleResult}).
 */
export class RetrieveByTopIncidentProductKbArticleResponse extends OrganizationResponse {
  constructor(public result: RetrieveByTopIncidentProductKbArticleResult) {
    super("RetrieveByTopIncidentProductKbArticle");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveByTopIncidentProductKbArticleResponse {
    return new RetrieveByTopIncidentProductKbArticleResponse(
      data === undefined
        ? []
        : (data as { value: RetrieveByTopIncidentProductKbArticleResult }).value
    );
  }
}
