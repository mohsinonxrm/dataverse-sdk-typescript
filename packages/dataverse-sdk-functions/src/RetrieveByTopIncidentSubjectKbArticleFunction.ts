import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { kbarticle } from "./types/index.js";

/**
 * Response from the RetrieveByTopIncidentSubjectKbArticle function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveByTopIncidentSubjectKbArticleResponse = Array<
  kbarticle & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveByTopIncidentSubjectKbArticle function
 *
 * Bound function
 * Binding parameter: entity (mscrm.subject)
 *
 * The first argument is the id of the subject record to call it on.
 */
export class RetrieveByTopIncidentSubjectKbArticleFunction implements Executable<RetrieveByTopIncidentSubjectKbArticleResponse> {
  constructor(public readonly subjectId: string) {}

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
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveByTopIncidentSubjectKbArticleResponse })
      .value;
  }
}
