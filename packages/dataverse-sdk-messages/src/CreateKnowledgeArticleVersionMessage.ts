import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return CreateKnowledgeArticleVersionResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return CreateKnowledgeArticleVersionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateKnowledgeArticleVersion action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type CreateKnowledgeArticleVersionResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * CreateKnowledgeArticleVersion response message
 *
 * `result` is the value the CreateKnowledgeArticleVersion action returns (see {@link CreateKnowledgeArticleVersionResult}).
 */
export class CreateKnowledgeArticleVersionResponse extends OrganizationResponse {
  constructor(public result: CreateKnowledgeArticleVersionResult) {
    super("CreateKnowledgeArticleVersion");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateKnowledgeArticleVersionResponse {
    return new CreateKnowledgeArticleVersionResponse(
      (data ?? null) as CreateKnowledgeArticleVersionResult
    );
  }
}
