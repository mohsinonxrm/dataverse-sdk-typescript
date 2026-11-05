import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from CreateKnowledgeArticleVersion action
 */
export interface CreateKnowledgeArticleVersionResponse {
  value: EntityReference;
}

/**
 * CreateKnowledgeArticleVersion action
 *
 * Unbound action
 */
export class CreateKnowledgeArticleVersionAction implements Executable<CreateKnowledgeArticleVersionResponse> {
  constructor(
    public readonly source: EntityReference,
    public readonly isMajor: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateKnowledgeArticleVersion`;

    const body: Record<string, unknown> = {
      Source: this.source,
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

  async parseResponse(response: Response): Promise<CreateKnowledgeArticleVersionResponse> {
    const data = await response.json();
    return data as CreateKnowledgeArticleVersionResponse;
  }
}
