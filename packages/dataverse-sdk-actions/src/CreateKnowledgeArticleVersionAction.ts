import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
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
 * Parameters of the CreateKnowledgeArticleVersion action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateKnowledgeArticleVersionActionParameters {
  Source: EntityReference | AnyEntityPayload;
  IsMajor: boolean;
}

/**
 * CreateKnowledgeArticleVersion action
 *
 * Unbound action
 */
export class CreateKnowledgeArticleVersionAction implements Executable<CreateKnowledgeArticleVersionResponse> {
  constructor(public readonly parameters: CreateKnowledgeArticleVersionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateKnowledgeArticleVersion`;

    const body = requestBody({
      Source: this.parameters.Source,
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

  async parseResponse(response: Response): Promise<CreateKnowledgeArticleVersionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CreateKnowledgeArticleVersionResponse;
    return (await response.json()) as CreateKnowledgeArticleVersionResponse;
  }
}
