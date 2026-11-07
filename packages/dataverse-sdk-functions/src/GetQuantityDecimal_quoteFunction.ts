import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { product, uom } from "./types/index.js";

/**
 * Response from the GetQuantityDecimal function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetQuantityDecimal_quoteResponse {
  "@odata.context"?: string;
  Quantity: number;
}

/**
 * Parameters of the GetQuantityDecimal function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetQuantityDecimal_quoteFunctionParameters {
  Product: product;
  UoM: uom;
}

/**
 * GetQuantityDecimal function
 *
 * Bound function
 * Binding parameter: entity (mscrm.quote)
 *
 * The first argument is the id of the quote record to call it on.
 */
export class GetQuantityDecimal_quoteFunction implements Executable<GetQuantityDecimal_quoteResponse> {
  constructor(
    public readonly quoteId: string,
    public readonly parameters: GetQuantityDecimal_quoteFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/quotes(${odataLiteral.guid(this.quoteId)})/Microsoft.Dynamics.CRM.GetQuantityDecimal`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Product !== undefined) {
      aliases.push(`Product=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.Product, "mscrm.product", "EntityType")
      );
    }
    if (this.parameters.UoM !== undefined) {
      aliases.push(`UoM=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.UoM, "mscrm.uom", "EntityType"));
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

  async parseResponse(response: Response): Promise<GetQuantityDecimal_quoteResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetQuantityDecimal_quoteResponse;
  }
}
