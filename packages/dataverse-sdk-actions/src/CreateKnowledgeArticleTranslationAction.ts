import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
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
 * CreateKnowledgeArticleTranslation action
 *
 * Unbound action
 */
export class CreateKnowledgeArticleTranslationAction implements Executable<CreateKnowledgeArticleTranslationResponse> {
  constructor(
    public readonly source: EntityReference | AnyEntityPayload,
    public readonly language: EntityReference | AnyEntityPayload,
    public readonly isMajor?: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateKnowledgeArticleTranslation`;

    const body: Record<string, unknown> = {
      Source: this.source,
      Language: this.language,
      IsMajor: this.isMajor,
    };

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
    const data = await response.json();
    return data as CreateKnowledgeArticleTranslationResponse;
  }
}
