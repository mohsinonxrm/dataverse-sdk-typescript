import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the IncrementKnowledgeArticleViewCount message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface IncrementKnowledgeArticleViewCountRequestParameters {
  Source: EntityReference;
  ViewDate: string | Date;
  Location: number;
  Count: number;
}

/**
 * IncrementKnowledgeArticleViewCount request message
 *
 * Web API Function: IncrementKnowledgeArticleViewCount
 */
export class IncrementKnowledgeArticleViewCountRequest
  extends OrganizationRequest
  implements Executable<IncrementKnowledgeArticleViewCountResponse>
{
  declare readonly Parameters: Readonly<IncrementKnowledgeArticleViewCountRequestParameters>;

  constructor(parameters: IncrementKnowledgeArticleViewCountRequestParameters) {
    super("IncrementKnowledgeArticleViewCount", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IncrementKnowledgeArticleViewCount`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Source !== undefined) {
      aliases.push(`Source=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Source, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.Parameters.ViewDate !== undefined) {
      aliases.push(`ViewDate=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.ViewDate, "Edm.DateTimeOffset"));
    }
    if (this.Parameters.Location !== undefined) {
      aliases.push(`Location=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.Location, "Edm.Int32"));
    }
    if (this.Parameters.Count !== undefined) {
      aliases.push(`Count=@p4`);
      params.append("@p4", formatParameterAlias(this.Parameters.Count, "Edm.Int32"));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IncrementKnowledgeArticleViewCountResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return IncrementKnowledgeArticleViewCountResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return IncrementKnowledgeArticleViewCountResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the IncrementKnowledgeArticleViewCount function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type IncrementKnowledgeArticleViewCountResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * IncrementKnowledgeArticleViewCount response message
 *
 * `result` is the value the IncrementKnowledgeArticleViewCount function returns (see {@link IncrementKnowledgeArticleViewCountResult}).
 */
export class IncrementKnowledgeArticleViewCountResponse extends OrganizationResponse {
  constructor(public result: IncrementKnowledgeArticleViewCountResult) {
    super("IncrementKnowledgeArticleViewCount");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): IncrementKnowledgeArticleViewCountResponse {
    return new IncrementKnowledgeArticleViewCountResponse(
      (data ?? null) as IncrementKnowledgeArticleViewCountResult
    );
  }
}
