import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CreateKnowledgeArticleTranslation action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface CreateKnowledgeArticleTranslationResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the CreateKnowledgeArticleTranslation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateKnowledgeArticleTranslationActionParameters {
  Source: EntityReference | AnyEntityPayload;
  Language: EntityReference | AnyEntityPayload;
  IsMajor?: boolean;
}

/**
 * CreateKnowledgeArticleTranslation action
 *
 * Unbound action
 */
export class CreateKnowledgeArticleTranslationAction implements Executable<CreateKnowledgeArticleTranslationResponse> {
  constructor(public readonly parameters: CreateKnowledgeArticleTranslationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateKnowledgeArticleTranslation`;

    const body = requestBody({
      Source: this.parameters.Source,
      Language: this.parameters.Language,
      IsMajor: this.parameters.IsMajor,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CreateKnowledgeArticleTranslationResponse;
    return (await response.json()) as CreateKnowledgeArticleTranslationResponse;
  }
}
