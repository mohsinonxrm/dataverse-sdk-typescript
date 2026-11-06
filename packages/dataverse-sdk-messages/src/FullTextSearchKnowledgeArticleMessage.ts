import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return FullTextSearchKnowledgeArticleResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * FullTextSearchKnowledgeArticle response message
 */
export class FullTextSearchKnowledgeArticleResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("FullTextSearchKnowledgeArticle");
  }

  static fromResponse(data: unknown): FullTextSearchKnowledgeArticleResponse {
    return new FullTextSearchKnowledgeArticleResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
