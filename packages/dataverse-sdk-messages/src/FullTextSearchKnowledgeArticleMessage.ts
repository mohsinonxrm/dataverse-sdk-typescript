import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Parameters of the FullTextSearchKnowledgeArticle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FullTextSearchKnowledgeArticleRequestParameters {
  SearchText: string;
  UseInflection: boolean;
  RemoveDuplicates: boolean;
  StateCode: number;
  QueryExpression?: TypedQueryBase;
}

/**
 * FullTextSearchKnowledgeArticle request message
 *
 * Web API Action: FullTextSearchKnowledgeArticle
 */
export class FullTextSearchKnowledgeArticleRequest
  extends OrganizationRequest
  implements Executable<FullTextSearchKnowledgeArticleResponse>
{
  declare readonly Parameters: Readonly<FullTextSearchKnowledgeArticleRequestParameters>;

  constructor(parameters: FullTextSearchKnowledgeArticleRequestParameters) {
    super("FullTextSearchKnowledgeArticle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/FullTextSearchKnowledgeArticle`;

    const body = requestBody({
      SearchText: this.Parameters.SearchText,
      UseInflection: this.Parameters.UseInflection,
      RemoveDuplicates: this.Parameters.RemoveDuplicates,
      StateCode: this.Parameters.StateCode,
      QueryExpression: enumBody(this.Parameters.QueryExpression, "QueryBase"),
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<FullTextSearchKnowledgeArticleResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return FullTextSearchKnowledgeArticleResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return FullTextSearchKnowledgeArticleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the FullTextSearchKnowledgeArticle action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type FullTextSearchKnowledgeArticleResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * FullTextSearchKnowledgeArticle response message
 *
 * `result` is the value the FullTextSearchKnowledgeArticle action returns (see {@link FullTextSearchKnowledgeArticleResult}).
 */
export class FullTextSearchKnowledgeArticleResponse extends OrganizationResponse {
  constructor(public result: FullTextSearchKnowledgeArticleResult) {
    super("FullTextSearchKnowledgeArticle");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): FullTextSearchKnowledgeArticleResponse {
    return new FullTextSearchKnowledgeArticleResponse(
      data === undefined ? [] : (data as { value: FullTextSearchKnowledgeArticleResult }).value
    );
  }
}
