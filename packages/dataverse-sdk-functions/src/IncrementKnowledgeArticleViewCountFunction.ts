import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from IncrementKnowledgeArticleViewCount function
 */
export interface IncrementKnowledgeArticleViewCountResponse {
  value: EntityReference;
}

/**
 * IncrementKnowledgeArticleViewCount function
 *
 * Unbound function
 */
export class IncrementKnowledgeArticleViewCountFunction implements Executable<IncrementKnowledgeArticleViewCountResponse> {
  constructor(
    public readonly source: EntityReference,
    public readonly viewDate: string,
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
      params.append(
        "@p1",
        JSON.stringify({
          "@odata.id": `${getEntitySetNameFromReference(this.source)}(${this.source.id})`,
        })
      );
    }
    if (this.viewDate !== undefined) {
      aliases.push(`ViewDate=@p2`);
      params.append(
        "@p2",
        typeof this.viewDate === "string" ? `'${this.viewDate}'` : String(this.viewDate)
      );
    }
    if (this.location !== undefined) {
      aliases.push(`Location=@p3`);
      params.append(
        "@p3",
        typeof this.location === "string" ? `'${this.location}'` : String(this.location)
      );
    }
    if (this.count !== undefined) {
      aliases.push(`Count=@p4`);
      params.append("@p4", typeof this.count === "string" ? `'${this.count}'` : String(this.count));
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
