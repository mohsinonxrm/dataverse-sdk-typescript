import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the CreateKnowledgeArticleVersion action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CreateKnowledgeArticleVersionResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as CreateKnowledgeArticleVersionResponse;
  }
}
