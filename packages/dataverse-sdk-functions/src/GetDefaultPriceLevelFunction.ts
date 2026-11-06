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
 * Parameters of the GetDefaultPriceLevel function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetDefaultPriceLevelFunctionParameters {
  EntityName: string;
}

/**
 * GetDefaultPriceLevel function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.pricelevel))
 */
export class GetDefaultPriceLevelFunction implements Executable<GetDefaultPriceLevelResponse> {
  constructor(public readonly parameters: GetDefaultPriceLevelFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/pricelevels/Microsoft.Dynamics.CRM.GetDefaultPriceLevel`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.EntityName !== undefined) {
      aliases.push(`EntityName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.EntityName, "Edm.String"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetDefaultPriceLevelResponse;
    return (await response.json()) as GetDefaultPriceLevelResponse;
  }
}
