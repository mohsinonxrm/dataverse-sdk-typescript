import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the CreateKnowledgeArticleVersion message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateKnowledgeArticleVersionRequestParameters {
  Source: EntityReference | AnyEntityPayload;
  IsMajor: boolean;
}

/**
 * CreateKnowledgeArticleVersion request message
 *
 * Web API Action: CreateKnowledgeArticleVersion
 */
export class CreateKnowledgeArticleVersionRequest
  extends OrganizationRequest
  implements Executable<CreateKnowledgeArticleVersionResponse>
{
  declare readonly Parameters: Readonly<CreateKnowledgeArticleVersionRequestParameters>;

  constructor(parameters: CreateKnowledgeArticleVersionRequestParameters) {
    super("CreateKnowledgeArticleVersion", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateKnowledgeArticleVersion`;

    const body = requestBody({
      Source: this.Parameters.Source,
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

  async parseResponse(response: Response): Promise<CreateKnowledgeArticleVersionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CreateKnowledgeArticleVersionResponse.fromResponse({});
    return CreateKnowledgeArticleVersionResponse.fromResponse(await response.json());
  }
}

/**
 * CreateKnowledgeArticleVersion response message
 */
export class CreateKnowledgeArticleVersionResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("CreateKnowledgeArticleVersion");
  }

  static fromResponse(data: unknown): CreateKnowledgeArticleVersionResponse {
    return new CreateKnowledgeArticleVersionResponse(responseObject<Record<string, unknown>>(data));
  }
}
