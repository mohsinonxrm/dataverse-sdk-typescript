import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { RibbonLocationFilters } from "./types/index.js";

/**
 * Response from RetrieveEntityRibbon function
 */
export interface RetrieveEntityRibbonResponse {
  CompressedEntityXml: string;
}

/**
 * RetrieveEntityRibbon function
 *
 * Unbound function
 */
export class RetrieveEntityRibbonFunction implements Executable<RetrieveEntityRibbonResponse> {
  constructor(
    public readonly entityName: string,
    public readonly ribbonLocationFilter: RibbonLocationFilters | keyof typeof RibbonLocationFilters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEntityRibbon`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entityName !== undefined) {
      aliases.push(`EntityName=@p1`);
      params.append("@p1", formatParameterAlias(this.entityName, "Edm.String"));
    }
    if (this.ribbonLocationFilter !== undefined) {
      aliases.push(`RibbonLocationFilter=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(
          this.ribbonLocationFilter,
          "mscrm.RibbonLocationFilters",
          "EnumerationType"
        )
      );
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

  async parseResponse(response: Response): Promise<RetrieveEntityRibbonResponse> {
    const data = await response.json();
    return data as RetrieveEntityRibbonResponse;
  }
}
