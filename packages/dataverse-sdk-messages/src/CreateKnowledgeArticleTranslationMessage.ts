import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the CreateKnowledgeArticleTranslation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateKnowledgeArticleTranslationRequestParameters {
  Source: EntityReference | AnyEntityPayload;
  Language: EntityReference | AnyEntityPayload;
  IsMajor?: boolean;
}

/**
 * CreateKnowledgeArticleTranslation request message
 *
 * Web API Action: CreateKnowledgeArticleTranslation
 */
export class CreateKnowledgeArticleTranslationRequest
  extends OrganizationRequest
  implements Executable<CreateKnowledgeArticleTranslationResponse>
{
  declare readonly Parameters: Readonly<CreateKnowledgeArticleTranslationRequestParameters>;

  constructor(parameters: CreateKnowledgeArticleTranslationRequestParameters) {
    super("CreateKnowledgeArticleTranslation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateKnowledgeArticleTranslation`;

    const body = requestBody({
      Source: this.Parameters.Source,
      Language: this.Parameters.Language,
      IsMajor: this.Parameters.IsMajor,
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

  async parseResponse(response: Response): Promise<CreateKnowledgeArticleTranslationResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return CreateKnowledgeArticleTranslationResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return CreateKnowledgeArticleTranslationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateKnowledgeArticleTranslation action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CreateKnowledgeArticleTranslationResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * CreateKnowledgeArticleTranslation response message
 *
 * `result` is the value the CreateKnowledgeArticleTranslation action returns (see {@link CreateKnowledgeArticleTranslationResult}).
 */
export class CreateKnowledgeArticleTranslationResponse extends OrganizationResponse {
  constructor(public result: CreateKnowledgeArticleTranslationResult) {
    super("CreateKnowledgeArticleTranslation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateKnowledgeArticleTranslationResponse {
    return new CreateKnowledgeArticleTranslationResponse(
      (data ?? null) as CreateKnowledgeArticleTranslationResult
    );
  }
}
