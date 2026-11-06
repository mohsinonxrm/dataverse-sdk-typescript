import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CreateKnowledgeArticleVersion action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface CreateKnowledgeArticleVersionResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * CreateKnowledgeArticleVersion action
 *
 * Unbound action
 */
export class CreateKnowledgeArticleVersionAction implements Executable<CreateKnowledgeArticleVersionResponse> {
  constructor(
    public readonly source: EntityReference | AnyEntityPayload,
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
