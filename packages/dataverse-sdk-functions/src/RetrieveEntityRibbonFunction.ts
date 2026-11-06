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
 * Parameters of the RetrieveEntityRibbon function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveEntityRibbonFunctionParameters {
  EntityName: string;
  RibbonLocationFilter: RibbonLocationFilters | keyof typeof RibbonLocationFilters;
}

/**
 * RetrieveEntityRibbon function
 *
 * Unbound function
 */
export class RetrieveEntityRibbonFunction implements Executable<RetrieveEntityRibbonResponse> {
  constructor(public readonly parameters: RetrieveEntityRibbonFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEntityRibbon`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.EntityName !== undefined) {
      aliases.push(`EntityName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.EntityName, "Edm.String"));
    }
    if (this.parameters.RibbonLocationFilter !== undefined) {
      aliases.push(`RibbonLocationFilter=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(
          this.parameters.RibbonLocationFilter,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveEntityRibbonResponse;
    return (await response.json()) as RetrieveEntityRibbonResponse;
  }
}
