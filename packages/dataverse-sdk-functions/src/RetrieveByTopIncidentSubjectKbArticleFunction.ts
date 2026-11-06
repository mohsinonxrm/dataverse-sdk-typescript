import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { kbarticle } from "./types/index.js";

/**
 * Response from RetrieveByTopIncidentSubjectKbArticle function
 */
export interface RetrieveByTopIncidentSubjectKbArticleResponse {
  value: kbarticle[];
}

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
    let url = `${baseUrl}/subjects(${this.subjectId})/Microsoft.Dynamics.CRM.RetrieveByTopIncidentSubjectKbArticle`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveByTopIncidentSubjectKbArticleResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveByTopIncidentSubjectKbArticleResponse;
  }
}
