import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { pricelevel } from "./types/index.js";

/**
 * Response from GetDefaultPriceLevel function
 */
export interface GetDefaultPriceLevelResponse {
  value: pricelevel[];
}

/**
 * GetDefaultPriceLevel function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.pricelevel))
 */
export class GetDefaultPriceLevelFunction implements Executable<GetDefaultPriceLevelResponse> {
  constructor(public readonly entityName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/pricelevels/Microsoft.Dynamics.CRM.GetDefaultPriceLevel`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entityName !== undefined) {
      aliases.push(`EntityName=@p1`);
      params.append("@p1", formatParameterAlias(this.entityName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<GetDefaultPriceLevelResponse> {
    const data = await response.json();
    return data as GetDefaultPriceLevelResponse;
  }
}
