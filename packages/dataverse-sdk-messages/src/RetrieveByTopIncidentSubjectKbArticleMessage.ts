import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { kbarticle } from "./types/index.js";

/**
 * RetrieveByTopIncidentSubjectKbArticle request message
 *
 * Web API Function: RetrieveByTopIncidentSubjectKbArticle
 *
 * The first argument is the id of the subject record to call it on.
 */
export class RetrieveByTopIncidentSubjectKbArticleRequest
  extends OrganizationRequest
  implements Executable<RetrieveByTopIncidentSubjectKbArticleResponse>
{
  constructor(public subjectId: string) {
    super("RetrieveByTopIncidentSubjectKbArticle");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/subjects(${odataLiteral.guid(this.subjectId)})/Microsoft.Dynamics.CRM.RetrieveByTopIncidentSubjectKbArticle`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveByTopIncidentSubjectKbArticleResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveByTopIncidentSubjectKbArticleResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveByTopIncidentSubjectKbArticleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveByTopIncidentSubjectKbArticle function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveByTopIncidentSubjectKbArticleResult = Array<
  kbarticle & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveByTopIncidentSubjectKbArticle response message
 *
 * `result` is the value the RetrieveByTopIncidentSubjectKbArticle function returns (see {@link RetrieveByTopIncidentSubjectKbArticleResult}).
 */
export class RetrieveByTopIncidentSubjectKbArticleResponse extends OrganizationResponse {
  constructor(public result: RetrieveByTopIncidentSubjectKbArticleResult) {
    super("RetrieveByTopIncidentSubjectKbArticle");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveByTopIncidentSubjectKbArticleResponse {
    return new RetrieveByTopIncidentSubjectKbArticleResponse(
      data === undefined
        ? []
        : (data as { value: RetrieveByTopIncidentSubjectKbArticleResult }).value
    );
  }
}
