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
 * Parameters of the IncrementKnowledgeArticleViewCount function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface IncrementKnowledgeArticleViewCountFunctionParameters {
  Source: EntityReference;
  ViewDate: string | Date;
  Location: number;
  Count: number;
}

/**
 * IncrementKnowledgeArticleViewCount function
 *
 * Unbound function
 */
export class IncrementKnowledgeArticleViewCountFunction implements Executable<IncrementKnowledgeArticleViewCountResponse> {
  constructor(public readonly parameters: IncrementKnowledgeArticleViewCountFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IncrementKnowledgeArticleViewCount`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Source !== undefined) {
      aliases.push(`Source=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.Source, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.parameters.ViewDate !== undefined) {
      aliases.push(`ViewDate=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.ViewDate, "Edm.DateTimeOffset"));
    }
    if (this.parameters.Location !== undefined) {
      aliases.push(`Location=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.Location, "Edm.Int32"));
    }
    if (this.parameters.Count !== undefined) {
      aliases.push(`Count=@p4`);
      params.append("@p4", formatParameterAlias(this.parameters.Count, "Edm.Int32"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as IncrementKnowledgeArticleViewCountResponse;
    return (await response.json()) as IncrementKnowledgeArticleViewCountResponse;
  }
}
