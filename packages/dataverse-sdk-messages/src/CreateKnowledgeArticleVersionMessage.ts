import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * CreateKnowledgeArticleVersion request message
 *
 * Web API Action: CreateKnowledgeArticleVersion
 */
export class CreateKnowledgeArticleVersionRequest
  extends OrganizationRequest
  implements Executable<CreateKnowledgeArticleVersionResponse>
{
  constructor(
    public source: EntityReference,
    public isMajor: boolean
  ) {
    super("CreateKnowledgeArticleVersion");
  }

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
    return CreateKnowledgeArticleVersionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Source: this.source,
      IsMajor: this.isMajor,
    };
  }
}

/**
 * CreateKnowledgeArticleVersion response message
 */
export class CreateKnowledgeArticleVersionResponse extends OrganizationResponse {
  constructor(public result: EntityReference) {
    super("CreateKnowledgeArticleVersion");
  }

  static fromResponse(data: unknown): CreateKnowledgeArticleVersionResponse {
    return new CreateKnowledgeArticleVersionResponse((data as any).value);
  }
}
