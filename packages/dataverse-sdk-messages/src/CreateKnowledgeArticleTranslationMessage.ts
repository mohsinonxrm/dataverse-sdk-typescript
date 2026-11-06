import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CreateKnowledgeArticleTranslationResponse.fromResponse(text ? JSON.parse(text) : {});
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
