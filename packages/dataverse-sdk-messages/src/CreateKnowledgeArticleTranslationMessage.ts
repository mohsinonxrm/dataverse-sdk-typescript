import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";

/**
 * CreateKnowledgeArticleTranslation request message
 *
 * Web API Action: CreateKnowledgeArticleTranslation
 */
export class CreateKnowledgeArticleTranslationRequest
  extends OrganizationRequest
  implements Executable<CreateKnowledgeArticleTranslationResponse>
{
  constructor(
    public source: EntityReference,
    public language: EntityReference,
    public isMajor: boolean
  ) {
    super("CreateKnowledgeArticleTranslation");
  }

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
    return CreateKnowledgeArticleTranslationResponse.fromResponse(data);
  }
}

/**
 * CreateKnowledgeArticleTranslation response message
 */
export class CreateKnowledgeArticleTranslationResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("CreateKnowledgeArticleTranslation");
  }

  static fromResponse(data: unknown): CreateKnowledgeArticleTranslationResponse {
    return new CreateKnowledgeArticleTranslationResponse(
      responseObject<Record<string, unknown>>(data)
    );
  }
}
