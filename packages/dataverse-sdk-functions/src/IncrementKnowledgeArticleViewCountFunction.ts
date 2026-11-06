import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from IncrementKnowledgeArticleViewCount function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface IncrementKnowledgeArticleViewCountResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * IncrementKnowledgeArticleViewCount function
 *
 * Unbound function
 */
export class IncrementKnowledgeArticleViewCountFunction implements Executable<IncrementKnowledgeArticleViewCountResponse> {
  constructor(
    public readonly source: EntityReference,
    public readonly viewDate: string | Date,
    public readonly location: number,
    public readonly count: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IncrementKnowledgeArticleViewCount`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.source !== undefined) {
      aliases.push(`Source=@p1`);
      params.append("@p1", formatParameterAlias(this.source, "mscrm.crmbaseentity", "EntityType"));
    }
    if (this.viewDate !== undefined) {
      aliases.push(`ViewDate=@p2`);
      params.append("@p2", formatParameterAlias(this.viewDate, "Edm.DateTimeOffset"));
    }
    if (this.location !== undefined) {
      aliases.push(`Location=@p3`);
      params.append("@p3", formatParameterAlias(this.location, "Edm.Int32"));
    }
    if (this.count !== undefined) {
      aliases.push(`Count=@p4`);
      params.append("@p4", formatParameterAlias(this.count, "Edm.Int32"));
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
    const data = await response.json();
    return data as IncrementKnowledgeArticleViewCountResponse;
  }
}
