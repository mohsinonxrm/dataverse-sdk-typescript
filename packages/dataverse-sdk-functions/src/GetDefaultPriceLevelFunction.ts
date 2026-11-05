import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
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
    let url = `${baseUrl}/GetDefaultPriceLevel`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entityName !== undefined) {
      aliases.push(`EntityName=@p1`);
      params.append("@p1", formatAliasValue(this.entityName));
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
